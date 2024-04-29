import React, {useEffect, useState} from "react";
import {Group, Text, Button, Container, Space} from "@mantine/core";
import {IconChevronLeft} from "@tabler/icons-react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {createBlogSchema} from "../schema/basicSchema";
import BlogForm from "../components/form/BlogForm";
import { getBlogByID, updateBlog} from "../api/blog.ts";

const EditBlog = () => {
    const {id} = useParams();
    const [files, setFiles] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [formDesc, setFormDesc] = useState("");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: createBlogSchema,
        onSubmit:async (values) => {
            let formData = {
                id: new Date().getTime(),
                title: values.title,
                description: values.description,
                img: formik.values.img,
            };

            if (files?.length >0) {
                formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('image', files[0]);
            }

            const res = await updateBlog(id, formData);
            if (res?.data?.status ===1){
                navigate("/admin");
            }else{
                alert("Error creating blog");
            }
        },
    });

    useEffect(() => {
        getBlogDetail();
    },[]);

    const getBlogDetail= async()=>{
        const res = await getBlogByID(id);
        if (res.data?.status === 1){
            const data = res.data?.data;
            formik.setValues({...data});
            setFormDesc(data?.description);
        }
    }

    return (
        <Container size="xl" py={15}>
            <Group align="center">
                <Link to="/admin" style={{display: "flex"}}>
                    <IconChevronLeft/>
                </Link>
                <Text size="xl" fw={500}>
                    Edit Blog
                </Text>
            </Group>
            <Space h="lg"/>
            <form onSubmit={formik.handleSubmit}>
                <BlogForm files={files} setFiles={setFiles} formik={formik} editDescription={formDesc} />
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

export default EditBlog;
