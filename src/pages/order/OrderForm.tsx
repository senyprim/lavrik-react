import { Button } from "react-bootstrap";
import React from "react";
import { Col, Form, Modal } from "react-bootstrap";
import user from "../../store/User";
import { observer } from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom"
// import history from "../../history";
import { User as UserType } from "../../types";
import { routesMap } from "../../routes";

interface IProps extends RouteComponentProps{
}


function OrderForm(props:IProps) {
  const {history} = props;
  const [show, setShow] = React.useState(false);
  //#region callback
  const _closeModal = () => {
    setShow(false);
  };

  const _confirm = () => {
    _closeModal();
    user.setConfirm(true);
    history.push(routesMap.result);
  };

  const _next = (history) => {
    if (user.confirm) history.push(routesMap.result);
    else setShow(true);
  };
  //#endregion
  //Рендерит один инпут
  const _renderInput = (
    name: keyof UserType,
    value: string | null,
    onChange: (value: string) => void
  ) => {
    const data = user.getFormData(name);
    const errors = user.errors.getCategErrors(name);
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
          disabled={user.confirm}
          isInvalid={!isValid}
        />
        {errorsFeedback}
      </Form.Group>
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
      {(Object.keys(user.getAllFields()) as Array<keyof UserType>).map(
        (it, index) => (
          <li key={index}>
            {user.getFormData(it).caption}:{user.getAllFields()[it]}
          </li>
        )
      )}
    </ul>
  );
  //Рендерим форму
  return (
    <div>
      <h2>Контактные данные</h2>
      <Form>
        {renderInputs}
        <Link
          variant="warning"
          className="btn btn-warning"
          to={routesMap.cart}
        >
          Назад
        </Link>
        {user.confirm ? (
          <Button 
          variant="secondary"
          type={`button`} onClick={() => user.setConfirm(false)}>
            Изменить данные
          </Button>
        ) : null}
        <Button variant="primary" type={`button`} onClick={()=>_next(history)} disabled={!user.isValid()}>
          Принять данные
        </Button>
      </Form>

      <Modal show={show} onHide={_closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите контактные данные:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{_renderData}</ul>
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
