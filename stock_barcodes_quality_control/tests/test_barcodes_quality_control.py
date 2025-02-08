# Copyright 2108-2019 Francois Poizat <francois.poizat@gmail.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests.common import TransactionCase


class TestCommonStockBarcodes(TransactionCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
