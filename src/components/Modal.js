import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const ShowModal = (props) => {
  const { title, date, visible, onHide, content } = props;

  if (visible) {
    return (
      <>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={visible}
          onHide={onHide}
        >
          <ModalBG>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                {props.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {content} {props.date}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>종료</Button>
            </Modal.Footer>
          </ModalBG>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

const ModalBG = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80vw;
  max-width: 700px;
  height: 70vh;
  padding: 30px;
  background-color: white;
  z-index: 30;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

export default ShowModal;
