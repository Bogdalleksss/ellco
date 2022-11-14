import * as React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { INews, IPropsEdit } from '@/types/index';
import EditLayout from '@/layouts/EditLayout';
import EditField from '@/components/UI/EditField';
import { STATUS } from '@/utils/constants';
import { useAlert } from 'react-alert';
import { newsCreateOne, newsFetchOne, newsUpdateOne } from '@/store/news/NewsAsync';
import ImageUpload from '@/components/UI/ImageUpload';
import { validatorText } from '@/utils/validators';
import useForm from 'react-hooks-form-validator';
import { clearMeta } from '@/store/news/NewsSlice';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const UsersEditPage: React.FC<IPropsEdit> = ({ type = 'EDIT' }: IPropsEdit): JSX.Element => {
  const params = useParams();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [fields, formData] = useForm({
    title: validatorText,
    annonce: validatorText
  });

  const { title, annonce } = fields;

  const [imageURL, updateImageURL] = useState('');
  const [description, updateDescription] = useState(EditorState.createEmpty());
  const [image, updateImage] = useState(null);

  const { item, status, error } = useAppSelector(state => state.news);
  const news = item as INews;

  const { id } = params;

  const normalDescription = () => draftToHtml(convertToRaw(description.getCurrentContent()));

  useEffect(() => {
    return () => {
      dispatch(clearMeta());
    };
  }, []);

  if (type === 'EDIT') {
    useEffect(() => {
      dispatch(newsFetchOne(id));
    }, []);

    useEffect(() => {
      if (news.title) title.setValue(news.title);
      if (news.description) {
        const blocksFromHTML = convertFromHTML(news.description);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

        updateDescription(EditorState.createWithContent(state));
      }
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
    body.append('description', normalDescription());
    body.append('annonce', annonce.value);
    body.append('image', image || imageURL);

    if (type === 'EDIT') {
      dispatch(newsUpdateOne({
        id,
        body
      }));
    } else if (type === 'CREATE') {
      await dispatch(newsCreateOne(body));

      if (!error) history.goBack();
    }
  };

  const editDataIsValid = () => {
    return title.value === news.title &&
      annonce.value === news.annonce &&
      // normalDescription() === news.description &&
      imageURL === news.image;
  };

  return (
    <PageLayout
      title="Редактирование новости"
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
        <Editor
          editorState={description}
          wrapperClassName="text-editor-wrapper"
          editorClassName="text-editor-canvas"
          onEditorStateChange={(editorState) => updateDescription(editorState)}
          toolbar={{
            options: ['blockType', 'image'],
            blockType: {
              inDropdown: false,
              options: ['H3']
            },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              previewImage: false,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: 'auto'
            }
          }}
        />
      </EditLayout>
    </PageLayout>
  );
};

export default UsersEditPage;
