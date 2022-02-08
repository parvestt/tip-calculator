class TipCalculator {
    #data = {};
    form = document.querySelector('.splitter__form');
    tips = document.querySelectorAll('input[name="tip"]');
    custom = document.querySelector('.custom');
    tipText = document.querySelector('#tip_amount');
    billText = document.querySelector('#bill_amount');
    reset = document.querySelector('.splitter__reset');

    constructor() {
        this.form.addEventListener('change', this._handleChange.bind(this));
        this.form.addEventListener('submit', this._submitForm);
        this.reset.addEventListener('click', this._reset.bind(this));
    };

    _handleChange(e) {
        const data = e.target;

        if (data.name === 'tip' || data.name === 'tipCustom') {
            this._tipChange(data);
        } else {
            this.#data[data.name] = +data.value;
        };

        this._calculateTipAndBill();
    };

    _tipChange(data) {
        this.#data.tip = +data.value;

        if (data.name === 'tip') {
            this.custom.value = '';
        } else {
            this.tips.forEach(tip => tip.checked = false);
        };
    };

    _calculateTipAndBill() {
        const { bill, tip, people } = this.#data;
        if (!bill || !tip || !people) return;

        const tipPer = (bill * (tip / 100)) / people;
        const totalPer = (bill / people) + tipPer;

        this._renderTipAndBill(tipPer, totalPer);
        this.reset.classList.remove('disabled');
    };

    _renderTipAndBill(tip, bill) {
        this.tipText.textContent = `$${tip.toFixed(2)}`;
        this.billText.textContent = `$${bill.toFixed(2)}`;
    };

    _reset() {
        this.form.reset();
        this.reset.classList.add('disabled');

        this.#data = {};
        this._renderTipAndBill(0, 0);
    };

    _submitForm(e) {
        e.preventDefault();
    };
};

const app = new TipCalculator();