import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SxProps } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { file2optiFile, file2optiDataurl } from "../../../lib/imageOptimaze";
import { useAddProductionStepMutation } from "../../../store/Production";
import { useGetProductionArticlesDataQuery } from "../../../store/Data";

const AddStep = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset, setValue } = useForm<IAddStep>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
      order: "" as unknown as number,
      productionArticle: "",
    },
  });

  const { data } = useGetProductionArticlesDataQuery("");
  const articles = useMemo(
    () =>
      Array.isArray(data)
        ? data.filter((article) => article.content !== "")
        : [],
    [data]
  );
  const [newStep, { isLoading }] = useAddProductionStepMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const res = await file2optiFile(
            inputRef.current.files[0],
            800,
            0.85,
            "webp"
          );
          setFile(res);
          const prRes = await file2optiDataurl(
            inputRef.current.files[0],
            500,
            0.75,
            "webp"
          );
          setPreview(prRes);
          e.target.value = "";
        }
        setUpLoading(false);
      } catch (e) {
        setUpLoading(false);
        dispatch(showErrorSnackbar("???????????? ???????????????? ??????????"));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (file) {
      setValue("image", "file");
    } else {
      setValue("image", "");
    }
  }, [file, setValue]);

  const handleNewStep = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      sendData.append("title", data.title);
      sendData.append("content", data.content);
      sendData.append("order", `${data.order}`);
      sendData.append("productionArticle", data.productionArticle);
      sendData.append("image", file as Blob);
      await newStep(sendData).unwrap();
      dispatch(showSuccessSnackbar(`???????????? ?????????????? ????????????????????????`));
      reset();
      setFile(null);
      setPreview("");
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const clear = useCallback(() => {
    setFile(null);
    setPreview("");
    if (inputRef.current != null) {
      inputRef.current.files = null;
    }
    setValue("image", "");
  }, [setValue]);

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.root} component="form">
        <Typography align="center" variant="h6" sx={{ mb: "12px" }}>
          ?????????? ???????????????????? ?? ????????????????????????
        </Typography>
        <input
          onChange={fileUpload}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={inputRef}
        />
        <Paper sx={styles.preview}>
          {file && (
            <IconButton onClick={clear} sx={styles.remove} size="small">
              <CloseRoundedIcon color="error" fontSize="small" />
            </IconButton>
          )}
          {preview && <img src={preview} alt="????????????" />}
        </Paper>
        <Controller
          name="image"
          control={control}
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: "?????????????????? ??????????????????????",
          }}
        />
        <Button
          startIcon={
            upLoading && <CircularProgress color="inherit" size={20} />
          }
          variant="outlined"
          color="success"
          onClick={() => inputRef.current?.click()}
        >
          ?????????????????? ??????????????????????
        </Button>

        <Controller
          name="productionArticle"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"warning"}
              tabIndex={2}
              sx={styles.input}
              label="???????????????? ????????????"
              fullWidth
              select
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            >
              <MenuItem dense value={undefined}></MenuItem>
              {articles?.map((article, i) => (
                <MenuItem dense key={i} value={article._id}>
                  <ListItemText>{article.title}</ListItemText>
                </MenuItem>
              )) || <p>wait...</p>}
            </TextField>
          )}
          rules={{
            required: "???????????????? ????????????",
          }}
        />

        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="??????????????????"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "?????????????? ?????????????????? ????????????",
          }}
        />

        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.field}
              label="????????????"
              fullWidth
              multiline
              minRows={3}
              maxRows={8}
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "???????????????? ????????????",
          }}
        />

        <Controller
          name="order"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="???????????????????? ?????????? ????????????"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "?????????????? ???????????????????? ??????????",
            pattern: {
              value: /^[0-9]*$/,
              message: "???????????? ??????????",
            },
          }}
        />

        <Button
          variant="contained"
          color="success"
          disabled={isLoading}
          onClick={handleNewStep}
          sx={{ mt: "16px" }}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          ????????????????????????
        </Button>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "6px!important",
    },
  },
  preview: {
    width: "100%",
    height: "280px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      padding: "8px",
      objectFit: "contain",
    },
  },
  remove: {
    position: "absolute",
    top: "2px",
    right: "2px",
  },
  error: {
    width: "100%",
    height: "18px",
    pl: "14px",
    fontSize: "12px",
    color: "error.main",
  },
  input: {
    mt: "20px",
  },
  field: {
    minHeight: '120px'
  }
};

export default AddStep;
