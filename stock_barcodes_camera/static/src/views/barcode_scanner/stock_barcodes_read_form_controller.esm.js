/** @odoo-module **/

import { FormController } from '@web/views/form/form_controller';
import { registry } from '@web/core/registry';
import { useService, useModel } from '@web/core/utils/hooks';

export class StockBarcodesReadFormController extends FormController {
    setup() {
        super.setup();
        this.barcodeScanner = useService('barcode_scanner');
        this.openCamera = this.openCamera.bind(this);
        this.model = useModel();
    }

    async openCamera() {
        this.barcodeScanner.scanBarcode({
            onResult: this.onBarcodeScanned.bind(this),
        });
    }

    onBarcodeScanned(barcode) {
        this.rpc({
            model: "wiz.stock.barcodes.read",
            method: "camera_barcode_scanner",
            kwargs: {
                barcode: barcode.replace(/Alt|Shift|Control/g, ""),
                location_hash: window.location.hash,
            },
        }).then(() => {
            window.location.reload();
        });
    }

    async renderHook() {
        await super.renderHook();
        const openCameraButton = this.el.querySelector('#open_barcode_scanner');
        if (openCameraButton) {
            openCameraButton.addEventListener('click', this.openCamera);
        }
        this.updateBarcodeScannerVisibility();
    }

    async updateBarcodeScannerVisibility() {
        const barcodeContainer = this.el.querySelector('#barcode_scanner_container');
        const showScanner = this.model.root.data.show_barcode_scanner;
        if (barcodeContainer) {
            barcodeContainer.style.display = showScanner ? 'block' : 'none';
        }
    }

    willUpdateProps(nextProps) {
        super.willUpdateProps(nextProps);
        this.updateBarcodeScannerVisibility();
    }
}

StockBarcodesReadFormController.template = 'stock_barcodes_camera.StockBarcodesReadFormView'; // Ajusta si es necesario
registry.category('views').add('wiz_stock_barcodes_read_form', StockBarcodesReadFormController);
