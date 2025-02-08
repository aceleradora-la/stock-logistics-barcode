from odoo import models


class QualityControlValidateWizard(models.TransientModel):
    _name = "quality.control.validate.wizard"
    _description = "Go to validate quality control"

    def action_validate_quality_control(self):
        context = dict(self.env.context)
        wizard_id = self.env[context["active_model"]].browse(context["active_id"])
        domain = [("state", "=", "ready")]
        if self.env.context.get("go_validate_quality_control", False) and wizard_id:
            wizard_id.picking_id._action_done()
            domain = [("picking_id", "=", wizard_id.picking_id.id)]
        context.update({"create": False})
        action = self.env["ir.actions.actions"]._for_xml_id(
            "quality_control_oca.action_qc_inspection"
        )
        action["domain"] = domain
        return action
