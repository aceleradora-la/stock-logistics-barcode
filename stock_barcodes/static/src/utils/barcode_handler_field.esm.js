/** @odoo-module **/
import { BarcodeHandlerField } from "@barcodes/barcode_handler_field";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
const { useEffect } = owl;

patch(BarcodeHandlerField, {
    setup() {
        // Llamamos al setup original si existe
        if (super.setup) {
            super.setup();
        }

        const busService = useService("bus_service");
        this.orm = useService("orm");

        const notifyChanges = async ({ detail: notifications }) => {
            for (const { payload, type } of notifications) {
                if (type === "stock_barcodes_refresh_data") {
                    await this.env.model.root.load();
                    this.env.model.notify();
                }
            }
        };

        useEffect(() => {
            busService.addChannel("barcode_reload");
            busService.addEventListener("notification", notifyChanges);
            return () => {
                busService.deleteChannel("barcode_reload");
                busService.removeEventListener("notification", notifyChanges);
            };
        });
    },

    onBarcodeScanned(event) {
        // También acá, usamos super.onBarcodeScanned si existe
        if (super.onBarcodeScanned) {
            super.onBarcodeScanned(event);
        }

        if (this.props.record.resModel.includes("wiz.stock.barcodes.read")) {
            $("#dummy_on_barcode_scanned").click();
        }
    },
});
