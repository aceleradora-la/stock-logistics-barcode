/** @odoo-module */
/* Copyright 2022 Tecnativa - Alexandre D. Díaz
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl). */

import { NumericStep } from "@web_widget_numeric_step/numeric_step.esm";
import { isAllowedBarcodeModel } from "../utils/barcodes_models_utils.esm";
import { patch } from "@web/core/utils/patch";

patch(NumericStep.prototype, {
    _onFocus() {
        try {
            console.log("[NumericStep] _onFocus - props:", this.props);
            const model = this.props?.record?.resModel;

            if (isAllowedBarcodeModel(model)) {
                console.log("[NumericStep] Auto-selecting input for model:", model);
                this.inputRef?.el?.select?.();
            }
        } catch (err) {
            console.error("[NumericStep] Error in _onFocus:", err);
        }
    },

    _onKeyDown(ev) {
        try {
            console.log("[NumericStep] _onKeyDown - keyCode:", ev.keyCode);
            const model = this.props?.record?.resModel;

            if (isAllowedBarcodeModel(model) && ev.keyCode === 13) {
                console.log("[NumericStep] Enter key detected for model:", model);

                const action_confirm = document.querySelector("button[name='action_confirm']");
                if (action_confirm) {
                    console.log("[NumericStep] Clicking 'action_confirm' button");
                    action_confirm.click();
                    return;
                }

                const action_confirm_force = document.querySelector("button[name='action_force_done']");
                if (action_confirm_force) {
                    console.log("[NumericStep] Clicking 'action_force_done' button");
                    action_confirm_force.click();
                    return;
                }

                console.warn("[NumericStep] No confirm buttons found.");
            }
        } catch (err) {
            console.error("[NumericStep] Error in _onKeyDown:", err);
        }

        // Llamar al método original de _onKeyDown si no interceptamos el Enter
        if (super._onKeyDown) {
            return super._onKeyDown(...arguments);
        }
    },
});
