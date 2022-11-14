import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IPromotions, IPropsEdit } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/EditField';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import ImageUpload from '@/components/UI/ImageUpload';
import { promotionsCreateOne, promotionsFetchOne, promotionsUpdateOne } from '@/store/propmotions/PromotionsAsync';
import { validatorText } from '@/utils/validators';
import useForm from 'react-hooks-form-validator';
import { clearMeta } from '@/store/propmotions/PromotionsSlice';

const UsersEditPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [fields, formData] = useForm({
    title: validatorText,
    annonce: validatorText,
    description: validatorText
  });

  const { title, annonce, description } = fields;

  const [imageURL, updateImageURL] = useState('');
  const [image, updateImage] = useState(null);

  const { item, status, error } = useAppSelector(state => state.promotions);
  const news = item as IPromotions;

  const { id } = params;

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  if (type === 'EDIT') {
    useEffect(() => {
      dispatch(promotionsFetchOne(id));
    }, []);

    useEffect(() => {
      if (news.title) title.setValue(news.title);
      if (news.description) description.setValue(news.description);
      if (news.annonce) annonce.setValue(news.annonce);
      if (news.image) updateImageURL(news.image);
    }, [news]);
  }

  useEffect(() => {
    if (error) alert.error(error);
  }, [error]);

  const onSave = async () => {
    const body = new FormData();

    body.append('title', title.value);
    body.append('description', description.value);
    body.append('annonce', annonce.value);
    body.append('tariffs', '');
    body.append('image', image || imageURL);

    if (type === 'EDIT') {
      dispatch(promotionsUpdateOne({
        id,
        body
      }));
    } else if (type === 'CREATE') {
      await dispatch(promotionsCreateOne(body));

      if (!error) history.goBack();
    }
  };

  const editDataIsValid = () => {
    return title.value === news.title &&
      annonce.value === news.annonce &&
      description.value === news.description &&
      imageURL === news.image;
  };

  return (
    <PageLayout
      title="Редактирование акции"
      type="edit"
    >
      <EditLayout
        onSave={onSave}
        pending={status === STATUS.PENDING}
        isValid={formData.isValid && !!imageURL && !editDataIsValid()}
      >
        <ImageUpload
          onChange={(file) => {
            updateImage(file);
            updateImageURL(URL.createObjectURL(file));
          }}
          disabled={status === STATUS.PENDING}
          image={imageURL}
        />
        <EditField
          label="Заголовок"
          placeholder="Заголовок новости"
          value={title.value || ''}
          onChange={(val: string) => title.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
        <EditField
          label="Краткое описание"
          placeholder="Краткое описание..."
          value={annonce.value || ''}
          onChange={(val: string) => annonce.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
        <EditField
          label="Статья"
          placeholder="Статья..."
          value={description.value || ''}
          onChange={(val: string) => description.setValue(val)}
          disabled={status === STATUS.PENDING}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default UsersEditPage;
