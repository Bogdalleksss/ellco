import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IPropsEdit, ITariff } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import useForm from 'react-hooks-form-validator';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import { clearMeta } from '@/store/users/UsersSlice';
import SelectField from '@/components/UI/Fields/SelectField';
import EditField from '@/components/UI/Fields/EditField';
import ChipsField from '@/components/UI/Fields/ChipsField';
import { Checkbox, FormControlLabel } from '@mui/material';
import { validatorPrice, validatorText } from '@/utils/validators';
import { tariffsCreateOne, tariffsFetchOne, tariffsUpdateOne } from '@/store/tariffs/TariffsAsync';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';

const types = [
  {
    _id: 1,
    title: 'STANDARD'
  },
  {
    _id: 2,
    title: 'GAME'
  },
  {
    _id: 3,
    title: 'TELEPHONY'
  },
  {
    _id: 4,
    title: 'SMOTROSHKA'
  },
  {
    _id: 5,
    title: 'KION'
  }
];

const TariffsEditPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [tariffType, updateTariffType] = useState(types[0]._id);
  const [tags, updateTags] = useState<string[]>([]);
  const [externalServices, updateExternalServices] = useState<string[]>([]);
  const [firstMonthFree, updateFirstMonthFree] = useState(false);
  const [showInAllSettlements, updateShowInAllSettlements] = useState(false);
  const [description, updateDescription] = useState(EditorState.createEmpty());

  const { item, status, error } = useAppSelector(state => state.tariffs);
  const tariff = item as ITariff;
  const formConfig = (typeConfig) => {
    return {
      title: validatorText,
      price: validatorPrice,
      newPrice: {
        required: false
      },
      priceDisplayCustom: validatorText,
      speedMbs: {
        required: [1, 2].includes(typeConfig)
      },
      channelsCount: {
        required: [1, 2, 4].includes(typeConfig)
      },
      firstMinutePrice: {
        required: [3].includes(typeConfig)
      },
      localTelephone??onnectionsType: {
        required: [3].includes(typeConfig)
      },
      kionServiceDescription: {
        required: [5].includes(typeConfig)
      },
      mtsServiceDescription: {
        required: [5].includes(typeConfig)
      }
    };
  };
  const [fields, formData] = useForm(formConfig(tariffType));

  const {
    title,
    price,
    newPrice,
    speedMbs,
    channelsCount,
    firstMinutePrice,
    kionServiceDescription,
    localTelephone??onnectionsType,
    mtsServiceDescription,
    priceDisplayCustom
  } = fields;

  const { id } = params;

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  useEffect(() => {
    const config = formConfig(tariffType);

    for (const key in config) {
      const value = fields[key].value;
      formData.removeFieldConfig(key);
      formData.addFieldConfig(key, {
        ...config[key],
        defaultValue: value
      });
    }
  }, [tariffType]);

  if (type === 'EDIT') {
    useEffect(() => {
      if (tariff?._id !== id) dispatch(tariffsFetchOne(id));
    }, []);

    useEffect(() => {
      for (const key in fields) {
        if (fields[key]) fields[key].setValue(tariff[key]);
      }
      if (tariff.type) {
        const newType = types.find(item => item.title.toLowerCase() === tariff.type);

        updateTariffType(newType._id);
      }
      if (tariff.description) {
        const replaced = tariff.description.replace(/&quot;/gi, '"');

        updateDescription(EditorState.createWithContent(convertFromRaw(JSON.parse(replaced))));
      }
      if (tariff.tags && typeof tariff.tags === 'string') updateTags(tariff.tags.split(','));
      else if (Array.isArray(tariff.tags) && tariff.tags.length) updateTags(tariff.tags);
    }, [tariff]);
  }

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  const normalDescription = () => convertToRaw(description.getCurrentContent());

  const onSave = async () => {
    const body: ITariff = {
      type: getTypeById(tariffType)?.title.toLowerCase(),
      category: 'internet',
      priceDisplayType: 'month',
      priceDisplayCustom: priceDisplayCustom.value || '??????.',
      description: `${JSON.stringify(normalDescription())}`,
      mobileMinutsDagestan: '',
      cityMinutsDagestan: '',
      title: title.value,
      price: +price.value,
      newPrice: +newPrice.value || null,
      speedMbs: +speedMbs.value || null,
      channelsCount: +channelsCount.value || null,
      firstMinutePrice: +firstMinutePrice.value || null,
      firstMonthFree,
      showInAllSettlements,
      localTelephone??onnectionsType: localTelephone??onnectionsType.value || '',
      kionServiceDescription: kionServiceDescription.value || '',
      mtsServiceDescription: mtsServiceDescription.value || '',
      tags: tags.join(',') || '',
      externalServices: externalServices.join(',') || ''
    };

    if (type === 'EDIT') {
      await dispatch(tariffsUpdateOne({
        id,
        body
      }));

      saveSuccess();
    } else if (type === 'CREATE') {
      await dispatch(tariffsCreateOne(body));

      if (!error) history.goBack();
    }
  };

  const saveSuccess = () => {
    if (status === STATUS.SUCCESS) {
      alert.success('?????????????? ??????????????????!');
    }
  };

  const getTypeById = (_id) => types.find(type => type._id === _id);

  return (
    <PageLayout
      title={`${type === 'CREATE' ? '????????????????' : '??????????????????????????'} ??????????`}
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={status === STATUS.PENDING}
        isValid={formData.isValid}
      >
        <SelectField
          data={{
            renderValue: getTypeById(tariffType)?.title || '',
            list: types
          }}
          value={tariffType}
          label="?????? ????????????"
          placeholder="?????? ???? ????????????"
          onChange={(val) => updateTariffType(val)}
          disabled={status === STATUS.PENDING}
        />
         <EditField
           label="???????????????? ????????????"
           placeholder="????????????????"
           value={title.value || ''}
           onChange={(val: string) => title.setValue(val)}
           disabled={status === STATUS.PENDING}
         />
        <EditField
          label="???????? ???? ??????????"
          placeholder="00.00"
          type="number"
          value={price.value || ''}
          onChange={(val: string) => price.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
        <EditField
          label="???????? ???? ??????????????"
          placeholder="00.00"
          type="number"
          value={newPrice.value || ''}
          onChange={(val: string) => newPrice.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
        <EditField
          label="???? ?????????? ???????????? ????????"
          placeholder="??????."
          value={priceDisplayCustom.value || ''}
          onChange={(val: string) => priceDisplayCustom.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
        {
          [1, 2].includes(tariffType)
            ? <EditField
                label="???????????????? ?????????????????? (Mb/s)"
                type="number"
                placeholder="????????????????"
                value={speedMbs.value || ''}
                onChange={(val: string) => speedMbs.setValue(val)}
                disabled={status === STATUS.PENDING}
              />
            : <></>
        }
        {
          [4].includes(tariffType)
            ? <>
              <ChipsField
                value={externalServices}
                label="???????????????????????????? ??????????????"
                placeholder="?????????????? ???? ??????????????????"
                onChange={(val) => updateExternalServices(val)}
                disabled={status === STATUS.PENDING}
              />
            </>
            : <></>
        }
        {
          [1, 2, 4].includes(tariffType) &&
            <EditField
              label="???????????????????? ??????????????"
              type="number"
              placeholder="????????????????????"
              value={channelsCount.value || ''}
              onChange={(val: string) => channelsCount.setValue(val)}
              disabled={status === STATUS.PENDING}
            />
        }

        {
          [1, 2, 3, 4].includes(tariffType) &&
            <ChipsField
              value={tags}
              label="????????"
              placeholder="???????????????? ????????"
              onChange={(val) => updateTags(val)}
              disabled={status === STATUS.PENDING}
            />
        }
        {
          [3].includes(tariffType)
            ? <>
              <EditField
                label="???????? ???? 1-???? ????????????"
                type="number"
                placeholder="00.00"
                value={firstMinutePrice.value || ''}
                onChange={(val: string) => firstMinutePrice.setValue(val)}
                disabled={status === STATUS.PENDING}
              />
              <EditField
                label="???????????????? ???????? ??????????????"
                placeholder="????????????????..."
                value={localTelephone??onnectionsType.value || ''}
                onChange={(val: string) => localTelephone??onnectionsType.setValue(val)}
                disabled={status === STATUS.PENDING}
              />
            </>
            : <></>
        }
        {
          [5].includes(tariffType)
            ? <>
              <EditField
                label="???????????????? KION ???????????? "
                placeholder="????????????????..."
                value={kionServiceDescription.value || ''}
                onChange={(val: string) => kionServiceDescription.setValue(val)}
                disabled={status === STATUS.PENDING}
              />
              <EditField
                label="???????????????? MTC ???????????? "
                placeholder="????????????????..."
                value={mtsServiceDescription.value || ''}
                onChange={(val: string) => mtsServiceDescription.setValue(val)}
                disabled={status === STATUS.PENDING}
              />
            </>
            : <></>
        }
        <Editor
          editorState={description}
          wrapperClassName="text-editor-wrapper"
          editorClassName="text-editor-canvas"
          onEditorStateChange={(editorState) => updateDescription(editorState)}
          toolbar={{
            options: ['blockType', 'list'],
            blockType: {
              inDropdown: false,
              options: ['H3']
            },
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['unordered']
            }
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={firstMonthFree}
              onChange={(val) => updateFirstMonthFree(val.target.checked)}
            />
          }
          label="???????????? ?????????? ????????????????"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={showInAllSettlements}
              onChange={(val) => updateShowInAllSettlements(val.target.checked)}
            />
          }
          label="???????????????????? ???????? ?????????? ???? ???????? ??????????????"
        />
      </EditLayout>
    </PageLayout>
  );
};

export default TariffsEditPage;
