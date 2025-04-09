# Copyright 2019 Sergio Teruel <sergio.teruel@tecnativa.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import models


class StockPicking(models.Model):
    _inherit = "stock.picking"

    def _prepare_barcode_wiz_vals(self, option_group):
        vals = {
            "picking_id": self.id,
            "res_model_id": self.env.ref("stock.model_stock_picking").id,
            "res_id": self.id,
            "picking_type_code": self.picking_type_code,
            "option_group_id": option_group.id,
            "manual_entry": option_group.manual_entry,
            "picking_mode": "picking",
            "show_barcode_scanner": self.env["ir.config_parameter"]
            .sudo()
            .get_param("stock_barcodes.enable_camera_barcode_scanner", False),
        }

        # Default location values based on picking type
        if self.picking_type_id.code == "outgoing" and self.location_dest_id:
            vals["location_dest_id"] = self.location_dest_id.id
        elif self.picking_type_id.code == "incoming" and self.location_id:
            vals["location_id"] = self.location_id.id

        # Option group overrides
        if option_group.get_option_value("location_id", "filled_default") and self.location_id:
            vals["location_id"] = self.location_id.id
        if option_group.get_option_value("location_dest_id", "filled_default") and self.location_dest_id:
            vals["location_dest_id"] = self.location_dest_id.id

        return vals
