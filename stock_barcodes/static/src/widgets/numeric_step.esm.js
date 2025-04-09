/** @odoo-module **/
/* Copyright 2022 Tecnativa - Alexandre D. Díaz
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl). */

import { NumericStep } from "@web_widget_numeric_step/numeric_step.esm";
import { isAllowedBarcodeModel } from "../utils/barcodes_models_utils.esm";
import { patch } from "@web/core/utils/patch";

patch(NumericStep.prototype, {
    _onFocus() {
        if (isAllowedBarcodeModel(this.props.record.resModel)) {
            // Auto select all content when user enters into fields with this widget.
            if (this.inputRef?.el?.select) {
                this.inputRef.el.select();
            }
        }
    },

    _onKeyDown(ev) {
        if (isAllowedBarcodeModel(this.props.record.resModel) && ev.key === "Enter") {
            const actionConfirm = document.querySelector("button[name='action_confirm']");
            if (actionConfirm) {
                actionConfirm.click();
                return;
            }

            const actionConfirmForce = document.querySelector("button[name='action_force_done']");
            if (actionConfirmForce) {
                actionConfirmForce.click();
                return;
            }
        }
        this._super(...arguments);
    },
});
