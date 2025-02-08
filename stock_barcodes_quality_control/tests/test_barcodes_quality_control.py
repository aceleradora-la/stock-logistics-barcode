# Copyright 2108-2019 Francois Poizat <francois.poizat@gmail.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests.common import TransactionCase


class TestCommonStockBarcodes(TransactionCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.WizardQualityControl = cls.env["quality.control.validate.wizard"]
        cls.WizardPicking = cls.env["wiz.stock.barcodes.read.picking"]
        cls.wizard_control = cls.WizardQualityControl.create({})
        cls.wizard_picking = cls.WizardPicking.create({})

    def test_action_validate_quality_control(self):
        with self.assertRaises(KeyError):
            self.wizard_control.action_validate_quality_control()
        self.assertFalse(self.wizard_picking.show_quantity_control())
