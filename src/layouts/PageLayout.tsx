import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { IPropsLayout } from '@/types/index';
import { Add, Cached } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SearchField from '@/components/UI/SearchField';

interface IProps extends IPropsLayout {
  title?: string
  type?: string
  add?: string
  search?: string
  reload?: () => void
  onSearch?: (val: string) => void
}

const PageLayout: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { children, title, type, reload, add, search, onSearch } = props;
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          container
          alignItems="center"
          sx={{
            maxWidth: '50%',
            gap: 1
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 2,
              marginTop: 2
            }}
          >
            { title }
          </Typography>

          {
            reload
              ? <Button
                  sx={{
                    minWidth: 'auto',
                    p: 0.4
                  }}
                  onClick={() => reload()}
                >
                  <Cached/>
                </Button>
              : <></>
          }
        </Grid>

        {
          add
            ? <Link to={`/${add}/create`}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    maxHeight: 40
                  }}
                >
                  <Add
                    fontSize="small"
                    sx={{
                      marginRight: 1
                    }}
                  />
                  <span>Добавить</span>
                </Button>
              </Link>
            : <></>
        }
      </Grid>

      <Box
        bgcolor="white"
        sx={{
          flex: type === 'edit' ? 'none' : 1,
          p: 2,
          border: 1,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          borderRadius: 1
        }}
      >
        {
          onSearch
            ? <SearchField
                value={search}
                onChange={val => onSearch(val)}
                sx={{
                  marginBottom: 2
                }}
              />
            : <></>
        }

        { children }
      </Box>
    </>
  );
};

export default PageLayout;
