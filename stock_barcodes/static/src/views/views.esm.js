/** @odoo-module **/

// ... (todo el código anterior igual, sin cambios) ...

patch(KanbanController.prototype, {
    setup() {
        this._super(...arguments);
        if (isAllowedBarcodeModel(this.props.resModel)) {
            setupView.call(this);
        }
    },
});

patch(FormController.prototype, {
    setup() {
        this._super(...arguments);
        if (isAllowedBarcodeModel(this.props.resModel)) {
            setupView.call(this);
        }
    },
});

patch(ListController.prototype, {
    setup() {
        this._super(...arguments);
        if (isAllowedBarcodeModel(this.props.resModel)) {
            setupView.call(this);
        }
    },
});
