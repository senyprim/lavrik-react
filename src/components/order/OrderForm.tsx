import React, { Dispatch } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ErrorType } from "~/models/ErrorStorage";
import User, { IUserData } from "~/models/User";
import { routesMap } from "~/routes";

export interface IProps {
  user: IUserData;
  confirm: boolean;
  changeUser: (field: keyof IUserData, value: string) => void;
  setConfirm: (confirm: boolean) => void;
  nextPage: () => void;
  previousPage: () => void;
  errors: Record<string, ErrorType[]>;
  isValidUser: boolean;
}

const OrderForm = (props: IProps) => {
  const [show, setShow] = React.useState(false);


  const {
    user,
    changeUser,
    setConfirm,
    nextPage,
    previousPage,
    confirm,
    errors,
    isValidUser,
  } = props;

  //Рендерит один инпут
  const _renderInput = (
    name: keyof IUserData,
    value: string | null,
    errors: ErrorType[],
    onChange: (value: string) => void
  ) => {
    const data = User.getFormData(name);
    const isValid = !errors || errors.length == 0;
    //Рендерим ошибки если есть
    const errorsFeedback = isValid ? null : (
      <Form.Control.Feedback type="invalid">
        {errors.map((it) => (
          <p key={it.errorNumber}>{it.message}</p>
        ))}
      </Form.Control.Feedback>
    );
    return (
      <Form.Group as={Col} controlId={data.id} key={data.id}>
        <Form.Label>{data.caption}:</Form.Label>
        <Form.Control
          placeholder={data.placeholder}
          type={data.itemType}
          value={value ?? ``}
          onChange={(evt) => onChange(evt.target.value)}
          disabled={confirm}
          isInvalid={!isValid}
        />
        {errorsFeedback}
      </Form.Group>
    );
  };
  //Рендерим все input
  const renderInputs = (Object.keys(user) as Array<keyof IUserData>).map(
    (name) =>
      _renderInput(name, user[name], errors[name], (value: string) =>
        changeUser(name, value)
      )
  );

  //Рендерим спиок введенных данных
  const _renderModalData = (
    <ul>
      {(Object.keys(user) as Array<keyof IUserData>).map((it, index) => (
        <li key={index}>
          {User.getFormData(it).caption}:{user[it]}
        </li>
      ))}
    </ul>
  );

  const closeConfirm = () => {
    setShow(false);
  };
  const confirmUserData = () => {
    closeConfirm();
    setConfirm(true);
    props.nextPage();
  };
  const unConfirmUserData = ()=>{
    setConfirm(false);
  }
  const showConfirmOrNextPage = () => {
    if (confirm) props.nextPage();
    else setShow(true);
  };
  //Рендерим форму
  return (
    <div>
      <h2>Контактные данные</h2>
      <Form>
        {renderInputs}
        <Link variant="warning" className="btn btn-warning" to={routesMap.cart}>
          Назад
        </Link>
        {confirm ? (
          <Button
            variant="secondary"
            type={`button`}
            onClick={unConfirmUserData}
          >
            Изменить данные
          </Button>
        ) : null}
        <Button
          variant="primary"
          type={`button`}
          onClick={showConfirmOrNextPage}
          disabled={!isValidUser}
        >
          Принять данные
        </Button>
      </Form>

      <Modal show={show} onHide={closeConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите контактные данные:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{_renderModalData}</ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeConfirm}>Не верно - Вернуться</Button>
          <Button onClick={confirmUserData}>Верно - Далее</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default OrderForm;
