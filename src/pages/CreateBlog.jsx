import React, {useEffect, useState} from "react";
import {Group, Text, Button, Container, Space} from "@mantine/core";
import {IconChevronLeft} from "@tabler/icons-react";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {createBlogSchema} from "../schema/basicSchema";
import BlogForm from "../components/form/BlogForm";
import {crateBlog} from "../api/blog.ts";

const CreateBlog = () => {
    const [files, setFiles] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: createBlogSchema,
        onSubmit:async (values) => {
            const newBlog = {
                id: new Date().getTime(),
                title: values.title,
                description: values.description,
            };

            let formData = {
                id: new Date().getTime(),
                title: values.title,
                description: values.description,
            };
            if (files) {
                formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('image', files[0]);
            }
            const res = await crateBlog(formData);
            if (res?.data?.status ===1){
                navigate("/admin");
            }else{
                alert("Error creating blog");
            }
        },
    });

    useEffect(() => {
        const savedBlogs = localStorage.getItem('blogs');
        const initialBlogs = savedBlogs ? JSON.parse(savedBlogs) : [];
        setBlogs(initialBlogs);
    },[])

    return (
        <Container size="xl" py={15}>
            <Group align="center">
                <Link to="/admin" style={{display: "flex"}}>
                    <IconChevronLeft/>
                </Link>
                <Text size="xl" fw={500}>
                    Add Blog
                </Text>
            </Group>
            <Space h="lg"/>
            <form onSubmit={formik.handleSubmit}>
                <BlogForm files={files} setFiles={setFiles} formik={formik}/>
                <Space h={15}/>
                <Group justify="end">
                    <Button variant="filled" py={5} px={30} size="xs" type="submit">
                        Save
                    </Button>
                </Group>
            </form>
        </Container>
    );
};

export default CreateBlog;
