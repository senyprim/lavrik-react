import React, { ChangeEvent, Dispatch, FormEvent } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import User, { FormDataType,PropertyType } from "~/models/User";
import { routesMap } from "~/routes";
import { User as UserType } from "~/types";
import { ErrorRecord, ErrorStorage, ErrorType } from "~/utils/ErrorStorage";


export interface IProps {
  user: UserType;
  formData:  FormDataType;
  confirm: boolean;
  changeUser: (field: keyof UserType, value: string) => void;
  setConfirm: (confirm: boolean) => void;
  nextPage: () => void;
  previousPage: () => void;
  errors: ErrorRecord<UserType>;
  isValidUser: boolean;
}

const OrderForm = (props: IProps) => {
  const [show, setShow] = React.useState(false);


  const {
    user,
    formData,
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
    name: keyof UserType,
    value: string | null,
    attributes:PropertyType,
    errors: ErrorType[],
    onChange: (value: string) => void
  ) => {
    const {id,caption,placeholder,itemType,...other}=attributes;
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
      <Form.Group as={Col} controlId={id} key={id}>
        <Form.Label>{caption}:</Form.Label>
        <Form.Control
          placeholder={placeholder}
          type={itemType}
          value={value ?? ``}
          onChange={(evt:any):void => onChange(evt.target.value)}
          disabled={confirm}
          isInvalid={!isValid}
          {...other}
        />
        {errorsFeedback}
      </Form.Group>
    );
  };

  //Рендерим все input
  const renderInputs = (Object.keys(user) as Array<keyof UserType>)
  .map(
    (name) =>
      _renderInput(
        name,
        user[name],
        formData[name],
        errors[name], 
        (value: string):void =>changeUser(name, value)
      )
  );

  //Рендерим спиок введенных данных в модальном окне
  const _renderModalData = (
    <ul>
      {(Object.keys(user) as Array<keyof UserType>).map((it, index) => (
        <li key={index}>
          {formData[it].caption}:{user[it]}
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
