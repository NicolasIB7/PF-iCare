import React, { useState } from "react";
import "./Register.module.css";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch } from "react-redux";
import { patientRegister } from "../../../redux/reducers/patientReducer";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//style
const cardDiv = {
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  height: "75rem",
  justifyContent: "space-around",
  padding: "2rem",
  boxShadow:
    "-10px 10px 0px #307196,-20px 20px 0px rgba(48, 113, 150, 0.7),-30px 30px 0px rgba(48, 113, 150, 0.4),-40px 40px 0px rgba(48, 113, 150, 0.1)",
};
const box = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  width: "40rem",
  height: "70rem",
  justifyContent: "space-evenly",
  marginBottom: "7rem",
};
const divPadre = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "135vh",
  backgroundColor: "#43B8C8",
};
const Register = () => {
  const dispatch = useDispatch();

  const [imageInputValue, setImageInputValue] = useState("");
  const [form, setForm] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    birthday: "03/02/1999",
    dni: "",
    location: "",
    image: "",
    mail: "",
    password: "",
  });

  const [error, setError] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    birthday: "",
    dni: "",
    location: "",
    image: "",
    mail: "",
    password: "",
  });

  const handleImage = (e) => {
    setImageInputValue(e.target.value);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });

      validateForm({ ...form, image: reader.result }, "image");
    };
  };

  const onChangeHandler = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const handleFechaNacimientoChange = (date, name) => {
    setForm({ ...form, birthday: date });
    validateForm({ ...form, [name]: form }, name);
  };

  const validateForm = (form, name) => {
    if (name === "name" || name === "surname") {
      if (/\d/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "Input allows only characters" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "password") {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          form[name]
        )
      ) {
        setError({
          ...error,
          [name]:
            "● 8 characters minimum ● 1 lowercase character ● 1 uppercase character ● 1 number ● 1 special character",
        });
      } else {
        setError({ ...error, [name]: "" });
      }
    }

    /**
        if (name === "phone") {
          if (/\D/.test(form[name])) {
            setError({ ...error, [name]: "Invalid Phone" });
          } else {
            setError({ ...error, [name]: "" });
          }
        }
    */

    if (name === "mail") {
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
          form[name] || form[name] !== ""
        )
      ) {
        setError({ ...error, [name]: "Must be a valid email" });
      } else setError({ ...error, [name]: "" });
    }
  };

  const handleSubmit = () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        dispatch(patientRegister({ ...form, phone: 12345 }))
          .then((res) => {
            if (res.type === "patient/register/fulfilled") {
              alert("Account Created");
            } else {
              alert("Error creating account!");
            }
            console.log(res.type);
          })
          .catch((err) => alert("error"));
      } catch (error) {
        console.log(error);
        alert("error");
      }
    } else {
      alert("Please complete all fields");
    }
  };
  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   width: "100%",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   gap: "10px",
      //   marginBottom: "15px",
      // }}
      style={divPadre}
    >
      <div style={box}>
        <Card style={cardDiv}>
          <Typography
            variant="h2"
            align="center"
            style={{
              color: "#307196",
              marginBottom: "1rem",
              fontWeight: "semibold",
              fontFamily: "monospace",
              fontSize: "3rem",
            }}
          >
            Patient Register
          </Typography>

          <MuiTelInput
            label="Phone"
            name="phone"
            value={form.phone}
            defaultCountry={"AR"}
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(value) => onChangeHandler("phone", value)}
          />

          <TextField
            error={error.name}
            label="Name*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="name"
            value={form.name}
            helperText={error.name}
          />

          <TextField
            error={error.surname}
            label="Surname*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="surname"
            value={form.surname}
            helperText={error.surname}
          />

          <TextField
            error={error.mail}
            label="Email*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="mail"
            value={form.mail}
            helperText={error.mail}
          />
          <TextField
            error={error.password}
            label="Password*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="password"
            value={form.password}
            type="password"
            helperText={error.password}
          />

          <TextField
            error={error.dni}
            label="DNI*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="dni"
            value={form.dni}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="birthday"
              label="Birthdate"
              value={form.birthday}
              maxDate={new Date()}
              inputVariant="outlined"
              error={error.birthday}
              helperText={error.birthday}
              onChange={(e) => handleFechaNacimientoChange(e)}
              renderInput={(params) => (
                <TextField {...params} style={{ width: "40vh" }} />
              )}
            />
          </LocalizationProvider>

          <TextField
            error={error.weight}
            label="Weight*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="weight"
            value={form.weight}
          />

          <TextField
            label="Height*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="height"
            value={form.height}
          />

          <TextField
            error={error.allergies}
            label="Allergies"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="allergies"
            value={form.allergies}
          />

          <TextField
            error={error.location}
            label="Location*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="location"
            value={form.location}
          />

          <TextField
            error={error.image}
            label="Image"
            style={
              form.image
                ? { width: "40vh", marginBottom: "1vh" }
                : { width: "40vh", label: { paddingLeft: "5vw" } }
            }
            onChange={handleImage}
            name="image"
            value={imageInputValue ? imageInputValue : ""}
            type="file"
            InputProps={
              !form.image
                ? { inputProps: { style: { paddingLeft: "4vw" } } }
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        {form.image && (
                          <IconButton
                            onClick={() => {
                              setForm(
                                { ...form, image: null },
                                setImageInputValue("")
                              );
                            }}
                          >
                            X
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }
            }
          />

          <Button
            onClick={handleSubmit}
            style={{
              border: "1px solid",
              marginTop: "1.2rem",
            }}
          >
            Save
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Register;
