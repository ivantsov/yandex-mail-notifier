import i18n from '../i18n';

const months = Array
    .from(Array(12).keys())
    .reduce((obj, item) => {
        obj[`popup_months_${item}`] = `month#${item}`;
        return obj;
    }, {});
const keys = {
    key_number_one: 'key number one',
    ...months
};
const getMessage = jest.fn(key => keys[key]);

window.chrome = {
    i18n: {
        getMessage
    }
};

describe('utils/i18n', () => {
    describe('text', () => {
        it('key with dots', () => {
            expect(i18n.text('key.number.one')).toBe(keys.key_number_one);
            expect(getMessage).lastCalledWith('key_number_one', []);
        });

        it('key with underscores', () => {
            const input = 'key_number_one';

            expect(i18n.text(input)).toBe(keys.key_number_one);
            expect(getMessage).lastCalledWith(input, []);
        });

        it('with arguments', () => {
            const input = 'key_number_one';
            const arg1 = 'arg1';
            const arg2 = 23;

            expect(i18n.text(input, arg1, arg2)).toBe(keys.key_number_one);
            expect(getMessage).lastCalledWith(input, [arg1, arg2])
        });
    });

    // Yandex uses "2016-11-17T22:33:22" ISO format for dates
    describe('date', () => {
        describe('this day', () => {
            const timezoneHoursOffset = (new Date()).getTimezoneOffset() / 60;

            it('no need nils', () => {
                const date = new Date();
                const hours = 12;
                const min = 10;
                const expected = `${hours + timezoneHoursOffset}:${min}`;

                date.setHours(hours, min);

                expect(i18n.date(date.toISOString())).toBe(expected);
            });

            it('need nils', () => {
                const date = new Date();
                const hours = 9;
                const min = 5;
                const expected = `0${hours + timezoneHoursOffset}:0${min}`;

                date.setHours(hours, min);

                expect(i18n.date(date.toISOString())).toBe(expected);
            });
        });

        it('prev month', () => {
            const date = new Date();
            const prevMonth = date.getMonth() - 1;
            date.setMonth(prevMonth);

            const expected = `${date.getDate()} ${months[`popup_months_${prevMonth}`]}`;

            expect(i18n.date(date.toISOString())).toBe(expected);
            expect(getMessage).lastCalledWith(`popup_months_${prevMonth}`, []);
        });

        it('another year', () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 1);

            const expected = `${date.getDate()} ${months[`popup_months_${date.getMonth()}`]} ${date.getFullYear()}`;

            expect(i18n.date(date.toISOString())).toBe(expected);
            expect(getMessage).lastCalledWith(`popup_months_${date.getMonth()}`, []);
        });
    });
});
