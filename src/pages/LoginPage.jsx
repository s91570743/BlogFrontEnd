import classes from "../assets/css/style.module.css";
import React from "react";
import {
    Container,
    Card,
    Image,
    Text,
    TextInput,
    Button,
    Grid,
    Space,
    Center,
    PasswordInput,
    rem,
} from "@mantine/core";
import loginImage from "../assets/images/login_image.png";
import {useMediaQuery} from "@mantine/hooks";
import {IconLock, IconMail} from "@tabler/icons-react";
import {useFormik} from "formik";
import {basicSchema} from "../schema/basicSchema";
import {postLoginAdmin} from "../api/user.ts";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const matches = useMediaQuery("(min-width: 62.25em)");
    const navigate = useNavigate();
    const {values, touched, errors, handleBlur, handleChange, handleSubmit} =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: basicSchema,
            onSubmit: async (values) => {
                const res = await postLoginAdmin(values);
                console.log(res.data.status)
                if (res.data.status === 1) {
                    navigate("/admin");
                }
            },
        });


    return (
        <Container className={classes.adminContainer}>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={classes.loginCard}
            >
                <Grid>
                    <Grid.Col span={{base: 12, md: 6, lg: 6}}>
                        <Image
                            radius="md"
                            src={loginImage}
                            display={matches ? "block" : "none"}
                        />
                    </Grid.Col>
                    <Grid.Col
                        span={{base: 12, md: 6, lg: 6}}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Text size="lg" fw={600} ta="center">
                            Welcome!!!📒
                        </Text>
                        <Space h="sm"/>

                        <Text size="sm" ta="center">
                            Log in to your account to continue.
                        </Text>
                        <Space h="md"/>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                label="Email"
                                placeholder="Enter your email"
                                labelProps={{
                                    style: {marginBottom: "5px", fontSize: "14px"},
                                }}
                                leftSection={
                                    <IconMail style={{width: rem(20), height: rem(20)}}/>
                                }
                                // required
                                size="md"
                                radius="md"
                                name="email"
                                error={errors.email && touched.email}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Space h="xs"/>
                            {errors.email && touched.email && (
                                <Text size="xs" style={{color: "#fa5252"}}>
                                    {errors.email}
                                </Text>
                            )}
                            <Space h="sm"/>
                            <PasswordInput
                                placeholder="Password"
                                label="Password"
                                // description="Password must include at least one letter, number and special character"
                                // required
                                size="md"
                                radius="md"
                                name="password"
                                leftSection={
                                    <IconLock style={{width: rem(20), height: rem(20)}}/>
                                }
                                labelProps={{
                                    style: {marginBottom: "5px", fontSize: "14px"},
                                }}
                                error={errors.password && touched.password}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Space h="xs"/>
                            {errors.password && touched.password && (
                                <Text size="xs" style={{color: "#fa5252"}}>
                                    {errors.password}
                                </Text>
                            )}
                            <Space h="lg"/>
                            <Center>
                                <Button variant="filled" px={48} color="black" type="submit">
                                    Login
                                </Button>
                            </Center>
                        </form>
                    </Grid.Col>
                </Grid>
            </Card>
        </Container>
    );
};

export default LoginPage;
