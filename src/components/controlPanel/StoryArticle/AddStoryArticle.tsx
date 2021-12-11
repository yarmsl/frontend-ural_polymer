import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { useAddStoryArticleMutation } from "../../../store/StoryArticle";

const AddStoryArticle = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddStoryArticle>({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [newStoryArticle, { isLoading }] = useAddStoryArticleMutation();

  const handleNewStory = handleSubmit(async (data) => {
    try {
      const res = await newStoryArticle(data).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} опубликована`));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography align="center" variant="h6" sx={{ mb: "12px" }}>
          Новая статья на странице О компании
        </Typography>

        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Заголовок"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Введите заголовок" }}
        />

        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              multiline
              minRows={3}
              maxRows={8}
              sx={styles.input}
              label="Статья"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Напишите статью" }}
        />

        <Button
          sx={{ mt: "16px" }}
          variant="contained"
          color="success"
          disabled={isLoading}
          onClick={handleNewStory}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Опубликовать
        </Button>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "6px!important",
    },
  },
  input: {
    minHeight: "68px",
    mt: "16px",
  },
};

export default AddStoryArticle;
