import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  rem,
  Modal,
  Group,
  Space,
  Divider,
  Avatar,
  Container,
  Button,
  Grid,
} from "@mantine/core";
import nature from "../../assets/images/nature.jpg";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import classes from "../../assets/css/style.module.css";
import { useDisclosure } from "@mantine/hooks";
import BlogForm from "../form/BlogForm";
import { useFormik } from "formik";
import { createBlogSchema } from "../../schema/basicSchema";
import { Link, useNavigate } from "react-router-dom";
import {localIMGURL} from "../../util/constant.ts";

const BlogCard = ({ item, handleDelete, blogList, setBlogList, isAdmin }) => {
  const htmlString = item.description;
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpen, setEditOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [blogOnEdit, setBlogOnEdit] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: createBlogSchema,
    onSubmit: (values) => {
      const updatedBlog = {
        id: new Date().getTime(),
        title: values.title,
        description: values.description,
      };
      console.log(blogOnEdit.id);
      const updatedIndex = blogList.findIndex(
        (blog) => blog.id === blogOnEdit.id
      );
      console.log(updatedIndex);
      const updatedBlogs = [...blogList];
      setBlogList(updatedBlogs);
      updatedBlogs[updatedIndex] = updatedBlog;
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      formik.resetForm();
      navigate("/admin");
      setEditOpen(false);
    },
  });

  const MAX_WORDS = 50;

  const handleDeleteClick = (id) => {
    handleDelete(id);
    close();
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    let truncatedDescription = words.slice(0, MAX_WORDS).join(" ");
    if (words.length > MAX_WORDS) {
      truncatedDescription += "...";
    }
    return truncatedDescription;
  };

  const handleEditClick = (blog) => {
    formik.setValues({
      title: blog.title,
      description: blog.description,
    });
    navigate("/blog/edit/" + blog.id);
    setEditOpen(true);
    setBlogOnEdit(blog);
  };

  const handleClose = () => {
    setEditOpen(false);
  };


  return (
    <Card p={0} pt={8} className={classes.cardWith}>
      <Grid>
        <Grid.Col
          span={{ base: 12, md: 6, lg: 6 }}
          order={{ base: 2, md: 1, lg: 1 }}
        >
          <Link to={`/blog/${item.id}`} className={classes.linkText}>
            <Text fw={600}>{item.title}</Text>
            <Space h="sm" />
            <div
              dangerouslySetInnerHTML={{
                __html: truncateDescription(htmlString),
              }}
              style={{ fontSize: "14px" }}
            />
          </Link>
          <Space h="xs" />
          <Group
            justify="space-between"
            mt="md"
            mb="xs"
            direction="row"
            align="start"
          >
            {isAdmin && (
              <Group>
                <div onClick={() => handleEditClick(item)}>
                  <Text size="sm" c="dimmed" className={classes.alignCenter}>
                    <IconEdit style={{ width: rem(16), height: rem(16) }} />
                    <Space w={4} />
                    <span>Edit</span>
                  </Text>
                </div>
                <div onClick={open}>
                  <Text size="sm" c="#bb2124" className={classes.alignCenter}>
                    <IconTrash style={{ width: rem(16), height: rem(16) }} />
                    <Space w={4} />
                    <span>Delete</span>
                  </Text>
                </div>
              </Group>
            )}
          </Group>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 6, lg: 6 }}
          order={{ base: 1, md: 2, lg: 2 }}
          className={classes.imagePosition}
        >
          <Link to={`/blog/${item.id}`}>
            <Image
              src={item?.img? localIMGURL+item?.img : nature}
              h={250}
              fit="cover"
              w={250}
              alt="Norway"
              pb={15}
            />
          </Link>
          <Space h={15} />
        </Grid.Col>
      </Grid>
      <Divider />
      <Modal
        opened={opened}
        onClose={close}
        // title="Delete"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Container fluid pb={15}>
          <Group style={{ flexDirection: "column", alignItems: "center" }}>
            <Avatar color="#ff4342" radius="xl">
              <IconTrash size="1.5rem" />
            </Avatar>
            <Text size="xl">Want to Delete</Text>
            <Text size="md" ta="center">
              Are you sure you want to delete this file? You will not be able to
              recover them?
            </Text>
            <Group>
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
              <Button
                variant="filled"
                color="#ff4243"
                onClick={() => handleDeleteClick(item.id)}
              >
                Delete
              </Button>
            </Group>
          </Group>
        </Container>
      </Modal>
      {/*<Modal*/}
      {/*  opened={editOpen}*/}
      {/*  onClose={handleClose}*/}
      {/*  // title="Delete"*/}
      {/*  fullScreen*/}
      {/*  centered*/}
      {/*  overlayProps={{*/}
      {/*    backgroundOpacity: 0.55,*/}
      {/*    blur: 3,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Container fluid pb={15}>*/}
      {/*    <form onSubmit={formik.handleSubmit}>*/}
      {/*      <BlogForm files={files} setFiles={setFiles} formik={formik} />*/}
      {/*      <Space h={25} />*/}
      {/*      <Group justify="end">*/}
      {/*        <Button variant="filled" py={5} px={30} size="xs" type="submit">*/}
      {/*          Edit*/}
      {/*        </Button>*/}
      {/*      </Group>*/}
      {/*    </form>*/}
      {/*  </Container>*/}
      {/*</Modal>*/}
    </Card>
  );
};

export default BlogCard;
