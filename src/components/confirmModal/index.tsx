"use client";

import React from 'react';
import './index.css';

interface ConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onHide,
  onConfirm,
  title = "Confirmar Ação",
  message,
  confirmText = "Sim, Confirmar",
  cancelText = "Cancelar",
  variant = 'danger',
  isLoading = false
}) => {
  if (!show) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <div className={`confirm-icon-wrapper ${variant}`}>
          <span className="confirm-icon-symbol">
            {variant === 'danger' ? '✕' : '!'}
          </span>
        </div>
        
        <h4 className="confirm-modal-title">{title}</h4>
        <p className="confirm-modal-message">{message}</p>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={onHide}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn-modal-confirm btn-${variant}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner-mini"></span> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;