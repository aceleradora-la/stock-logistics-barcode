# Copyright 2019 Sergio Teruel <sergio.teruel@tecnativa.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import fields, models


class StockBarcodesOptionGroup(models.Model):
    _inherit = "stock.barcodes.option.group"

    show_quality_control = fields.Boolean(
        default=False,
        help="Defines whether, when validating a pick from the barcode view, "
        "notification should be given of the existence of quality"
        " checks and whether they should be carried out at the time.",
    )
