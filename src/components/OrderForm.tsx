import Button from "@restart/ui/esm/Button";
import React from "react";
import { Modal } from "react-bootstrap";
import { User } from "../types";
import LazyInput from "./LazyInput";

interface IProps {
  user: User;
  onChange: (field: keyof User, value: string) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const OrderForm = (props: IProps) => {
  console.log('OrderForm');
  const [show, setShow] = React.useState(false);
  const closeModal = ()=>{
    console.log(`Закрываем окно`);
    setShow(false);
  }
  const confirm = ()=>{
    closeModal();
    props.nextPage();
  }
  const { name, email, phone } = props.user;
  return (
    <div>
      <h2>Контактные данные</h2>
      <form>
        <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Имя:
          </label>
          <div className="col-sm-10">
            <LazyInput
              other={{
                className: "form-control",
                id: "inputName",
                placeholder: "Имя",
              }}
              value={name}
              onChange={(evt) => props.onChange("name", evt.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <LazyInput
              other={{
                itemType: "email",
                className: "form-control",
                id: "inputEmail",
                placeholder: "Email",
              }}
              onChange={(evt) => props.onChange("email", evt.target.value)}
              value={email}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPhone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-10">
            <LazyInput
              other={{
                itemType: "tel",
                className: "form-control",
                id: "inputTel",
                placeholder: "Телефон",
              }}
              onChange={(evt) => props.onChange("phone", evt.target.value)}
              value={phone}
            />
          </div>
        </div>
        <button className="btn btn-danger" onClick={props.previousPage}>
          Назад
        </button>
        <button
        className="btn btn-primary"
        type="button"
          onClick={()=>setShow(true)}
        >
          Далее
        </button>
      </form>

      <Modal show={show} onHide={()=>closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите контактные данные:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Имя пользователя:{name}
            </li>
            <li>
              Електронная почта:{email}
            </li>
            <li>
              Телефон пользователя:{phone}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={()=>closeModal()}>
            Не верно - Вернуться 
          </Button>
          <Button  onClick={confirm}>
            Верно - Далее
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default OrderForm;
