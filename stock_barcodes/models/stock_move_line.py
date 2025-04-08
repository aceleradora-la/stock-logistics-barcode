# Copyright 2019 Sergio Teruel <sergio.teruel@tecnativa.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import api, fields, models


class StockMoveLine(models.Model):
    _inherit = "stock.move.line"

    barcode_scan_state = fields.Selection(
        [("pending", "Pending"), ("done", "Done"), ("done_forced", "Done forced")],
        string="Scan State",
        default="pending",
        compute="_compute_barcode_scan_state",
        readonly=False,
        store=True,
    )

    @api.depends("quantity", "reserved_quantity")
    def _compute_barcode_scan_state(self):
        for line in self:
            # Si la cantidad procesada >= cantidad reservada, está 'done'
            if line.quantity >= line.reserved_quantity:
                line.barcode_scan_state = "done"
            else:
                line.barcode_scan_state = "pending"

    def _barcodes_process_line_to_unlink(self):
        # Poner en cero la cantidad procesada
        self.quantity = 0.0

    def action_barcode_detailed_operation_unlink(self):
        for sml in self:
            stock_move = sml.move_id
            stock_move.barcode_backorder_action = "pending"
            sml.unlink()
            # HACK: Forzar refresco del wizard
            wiz_barcode = self.env["wiz.stock.barcodes.read.picking"].browse(
                self.env.context.get("wiz_barcode_id", False)
            )
            stock_move._action_assign()
            wiz_barcode.fill_todo_records()
            wiz_barcode.determine_todo_action()
