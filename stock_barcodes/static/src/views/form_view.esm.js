/** @odoo-module **/
/* Copyright 2021 Tecnativa - Alexandre D. Díaz
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl). */

import {FormController} from "@web/views/form/form_controller";
import {patch} from "@web/core/utils/patch";

// Guardamos el setup original
const originalSetup = FormController.prototype.setup;

patch(FormController.prototype, {
    setup() {
        // Llamamos al setup original
        originalSetup.call(this);

        // Lógica personalizada
        if (this.props.context.control_panel_hidden) {
            this.display.controlPanel = false;
        }
    },
});
