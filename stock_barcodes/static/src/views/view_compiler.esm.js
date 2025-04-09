/** @odoo-module **/

import { ViewCompiler } from "@web/views/view_compiler";
import { patch } from "@web/core/utils/patch";

patch(ViewCompiler.prototype, {
    compileButton(el, params) {
        const hotkey = el.getAttribute("data-hotkey");
        el.removeAttribute("data-hotkey");
        const button = this._super(el, params);
        if (hotkey) {
            button.dataset.hotkey = hotkey;  // Equivalente a setAttribute("data-hotkey", hotkey)
        }
        return button;
    },
});
