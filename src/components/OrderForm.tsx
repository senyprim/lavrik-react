import Button from "@restart/ui/esm/Button";
import React from "react";
import { Modal } from "react-bootstrap";
import LazyInput from "./LazyInput";
import router from "../store/Router";
import user from "../store/User";
import { observer } from "mobx-react";
import { User as UserType } from "../types";

function OrderForm() {
  const [show, setShow] = React.useState(false);

  const _closeModal = () => {
    console.log(`Закрываем окно`);
    setShow(false);
  };
  const _confirm = () => {
    _closeModal();
    user.setConfirm(true);
    router.nextPage();
  };
  const _next = ()=>{
    if (user.confirm) router.nextPage()
    else setShow(true);
  }
  //Рендерит один инпут
  const _renderInput = (
    name: keyof UserType,
    value: string | null,
    onChange: (value: string) => void
  ) => {
    const data = user.getFormData(name);
    const errors = user.getFieldErrors(name);
    const isValid = errors.length === 0;
    //Рендерим ошибки
    const errorsFeedback = (
      <div id={`${data.id}Feedback`} className="invalid-feedback">
        {errors.map((it) => (
          <p key={it[0]}>{it[1]}</p>
        ))}
      </div>
    );
    return (
      <div className={`row mb-3`} key={data.id}>
        <label htmlFor={data.id} className={`col-sm-2 col-form-label`}>
          {data.caption}:
        </label>
        <div className={`col-sm-10`}>
          <input
            className={`form-control ${isValid ? "is-valid" : "is-invalid"}`}
            id={data.id}
            placeholder={data.palceholder}
            itemType={data.itemType}
            value={value ?? ``}
            onChange={(evt) => onChange(evt.target.value)}
            disabled={user.confirm}
          />
          {errorsFeedback}
        </div>
      </div>
    );
  };
  //Рендерим все input
  const renderInputs = (
    Object.keys(user.getAllFields()) as Array<keyof UserType>
  ).map((name) =>
    _renderInput(name, user.getField(name), (value: string): void =>
      user.setField(name, value)
    )
  );
  //Рендерим спиок введенных данных 
  const _renderData = (
    <ul>
    {(Object.keys(user.getAllFields()) as Array<keyof UserType>)
      .map((it, index) => 
        <li key={index}>
          {user.getFormData(it).caption}:{user.getAllFields()[it]}
        </li>)
      }
  </ul>
  );
  //Рендерим форму
  return (
    <div>
      <h2>Контактные данные</h2>
      <form>
        {renderInputs}
        <button
          type={`button`}
          className={`btn btn-danger mr-3`}
          onClick={() => router.previusPage()}
        >
          Назад
        </button>
        {user.confirm && (
          <button
            type={`button`}
            className={`btn btn-secondary mr-3`}
            onClick={() => user.setConfirm(false)}
          >
            Изменить данные
          </button>
        )}
        <button
          type={`button`}
          className={`btn btn-primary`}
          onClick={_next}
          disabled={!user.isValid()}
        >
          Далее
        </button>
      </form>

      <Modal show={show} onHide={_closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите контактные данные:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            
            {_renderData}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={_closeModal}>Не верно - Вернуться</Button>
          <Button onClick={_confirm}>Верно - Далее</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default observer(OrderForm);
