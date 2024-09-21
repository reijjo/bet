import "./Modal.css";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => (
  <div className="modal-base">{children}</div>
);
