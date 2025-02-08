# Copyright 2025 Edilio Escalona Almira <e.escalona@binhex.cloud>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
import logging

from odoo import _, models

_logger = logging.getLogger(__name__)


class WizStockBarcodesReadPicking(models.TransientModel):
    _inherit = "wiz.stock.barcodes.read.picking"

    def _action_quality_control_validate(self):
        return {
            "type": "ir.actions.act_window",
            "res_model": "quality.control.validate.wizard",
            "view_mode": "form",
            "name": _("Quality control"),
            "target": "new",
        }

    def show_quantity_control(self):
        picking_id = self.picking_id
        product_ids = picking_id.mapped("move_ids_without_package.product_id")
        test_ids = (
            product_ids.mapped("qc_triggers.test")
            + product_ids.mapped("product_tmpl_id.qc_triggers").mapped("test")
            + self.env["qc.inspection"]
            .search(
                [
                    "&",
                    "|",
                    ("product_id", "in", product_ids.ids),
                    ("picking_id", "=", picking_id.id),
                    ("state", "=", "ready"),
                ]
            )
            .mapped("test")
        )
        return (
            self._name == "wiz.stock.barcodes.read.picking"
            and self.option_group_id.show_quality_control
            and test_ids
            and all(val.active is True for val in test_ids)
            and len(picking_id._check_immediate()) == 0
        )

    def action_validate_picking(self):
        if self.show_quantity_control():
            return self._action_quality_control_validate()
        return super().action_validate_picking()
