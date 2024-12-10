import { useAppDispatch } from '@/src/store/store';
import { addPromocodes } from '@/src/store/user/actions';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { MyButton } from '../Custom/myButton/my-button.component';
import { MyInput } from '../Custom/input/myInput.component';

export const AddNewPromocodes = () => {
  const [newPromocodeName, setNewPromocodeName] = useState('');
  const [newPromocodeDonateBonus, setNewPromocodeDonateBonus] = useState(0);
  const [newPromocodeGameBonus, setNewPromocodeGameBonus] = useState(0);
  const [newPromocodesAmount, setNewPromocodesAmount] = useState(0);

  const dispatch = useAppDispatch();

  const handleSetNewPromocodes = () => {
    dispatch(
      addPromocodes({
        name: newPromocodeName,
        gameCurrencyBonus: newPromocodeGameBonus,
        donateCurrencyBonus: newPromocodeDonateBonus,
        amount: newPromocodesAmount,
      }),
    );
    setNewPromocodesAmount(0);
    setNewPromocodeGameBonus(0);
    setNewPromocodeDonateBonus(0);
    setNewPromocodeName('');
  };

  return (
    <div className="flex">
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={() => {}}
      >
        <Form className="flex items-center justify-center">
          <label className="mr-4 min-w-fit text-center">Додати нові промокоди</label>
          <div className="flex flex-col">
            <div>
              Код промокодів
              <MyInput
                name="1"
                containerStyle="h-8 mx-2 max-w-60"
                placeholder="Код"
                type="text"
                value={newPromocodeName}
                onChange={(e) => setNewPromocodeName(e.target.value)}
              />
            </div>
            <div>
              Донат валюта
              <MyInput
                name="2"
                containerStyle="h-8 mx-2 max-w-60"
                placeholder="Бонус доната"
                type="number"
                value={newPromocodeDonateBonus}
                onChange={(e) => setNewPromocodeDonateBonus(e.target.valueAsNumber)}
              />
            </div>
            <div>
              Ігрова валюта
              <MyInput
                name="3"
                containerStyle="h-8 mx-2 max-w-60"
                placeholder="Бонус ігровий"
                type="number"
                value={newPromocodeGameBonus}
                onChange={(e) => setNewPromocodeGameBonus(e.target.valueAsNumber)}
              />
            </div>
            <div>
              Кількість промокодів
              <MyInput
                name="4"
                containerStyle="h-8 mx-2 max-w-60"
                placeholder="Кількість"
                type="number"
                value={newPromocodesAmount}
                onChange={(e) => setNewPromocodesAmount(e.target.valueAsNumber)}
              />
            </div>
          </div>
          <MyButton onClick={handleSetNewPromocodes} className="ml-8 min-w-fit rounded-xl">
            <span>Додати нові промокоди</span>
          </MyButton>
        </Form>
      </Formik>
    </div>
  );
};
