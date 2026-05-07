'use client'

import { Modal } from './Modal'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
  title?: string
  description?: string
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading,
  title = 'Confirmar exclusão',
  description = 'Essa ação não pode ser desfeita.',
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-5 text-center py-2 pb-3">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <AlertTriangle size={24} className="text-rose-400" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-text-muted">{description}</p>
        </div>
        <div className="flex gap-3 w-full mt-1">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm} loading={loading}>
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  )
}
