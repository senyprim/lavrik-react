import React, { Dispatch } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ErrorType } from "../../models/ErrorStorage";
import { IUserData } from "../../models/user";
import { ActionCreator, State } from "../../reducer/products/reducer";
import {
  getName,
  getPhone,
  getEmail,
  getConfirm,
  getErrors,
  isValidUser,
} from "../../reducer/products/selector";
import { Pages } from "../../types";
import { getDefaultInputProperty } from "../../utils/utils";

interface IProps {
  user: IUserData;
  confirm: boolean;
  changeUser: (field: keyof IUserData, value: string) => void;
  setConfirm: (confirm: boolean) => void;
  nextPage: () => void;
  previousPage: () => void;
  errors:Record<string, ErrorType[]>,
  isValidUser:boolean,
}

const OrderForm = (props: IProps) => {
  console.log("OrderForm");
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
  const [show, setShow] = React.useState(false);

  //Рендерит один инпут
  const _renderInput = (
    name: keyof IUserData,
    value: string,
    errors: ErrorType[],
    onChange: (value: string) => void,
    other?: Record<string, string>
  ): JSX.Element => {
    const data = getDefaultInputProperty(name, other);
    const isValid = !errors || errors.length == 0;
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
  const _renderInputs = (Object.keys(user) as Array<keyof IUserData>).map(
    (name) =>
      _renderInput(name, 
        user[name],
        errors[name],
        (value: string): void =>changeUser(name, value)
      )
  );

  //Рендерим спиок введенных данных
  const _renderModalData = (
    <ul>
      {(Object.keys(user) as Array<keyof IUserData>).map(
        (it, index) => (
          <li key={index}>
            {getDefaultInputProperty(it).caption}:{user[it]}
          </li>
        )
      )}
    </ul>
  );

  const _closeModal = () => {
    console.log(`Закрываем окно`);
    setShow(false);
  };
  const _confirmUserData = () => {
    _closeModal();
    setConfirm(true);
    props.nextPage();
  };
  const _next = () => {
    if (confirm) nextPage();
    else setShow(true);
  };

    //Рендерим форму
    return (
      <div>
        <h2>Контактные данные</h2>
        <Form>
          {_renderInputs}
          <Button
            variant="warning"
            type={`button`}
            onClick={previousPage}
          >
            Назад
          </Button>
          {confirm ? (
            <Button 
            variant="secondary"
            type={`button`} onClick={() => setConfirm(false)}>
              Изменить данные
            </Button>
          ) : null}
          <Button variant="primary" type={`button`} onClick={_next} disabled={!isValidUser}>
            Принять данные
          </Button>
        </Form>
  
        <Modal show={show} onHide={_closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите контактные данные:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>{_renderModalData}</ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={_closeModal}>Не верно - Вернуться</Button>
          <Button onClick={_confirmUserData}>Верно - Далее</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: IProps) =>
  Object.assign({}, ownProps, {
    user: {
      name: getName(state),
      phone: getPhone(state),
      email: getEmail(state),
    },
    confirm: getConfirm(state),
    errors: getErrors(state),
    isValidUser: isValidUser(state),
  });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IProps) =>
  Object.assign(
    {},
    {
      changeUser: (fieldName: keyof IUserData, value: string) =>
        dispatch(ActionCreator.setfield(fieldName, value)),
      setConfirm: (confirm: boolean) =>
        dispatch(ActionCreator.setConfirm(confirm)),
      previousPage: ()=>dispatch(ActionCreator.goToPage(Pages.Cart)),
      nextPage: ()=>dispatch(ActionCreator.goToPage(Pages.Finish)),
    }
  );

export { OrderForm };
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
