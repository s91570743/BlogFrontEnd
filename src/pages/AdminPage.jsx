import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Text, Button, Group, rem, Space } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import classes from "../assets/css/style.module.css";
import BlogCard from "../components/card/BlogCard";
import {getBlogs, removeBlogByID} from "../api/blog.ts";

const AdminPage = () => {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
  getBlogsData().then();
  }, []);

  const getBlogsData = async () =>{
    const res = await getBlogs();
    if (res?.data?.length > 0) {
      setBlogList( res.data );
    }
  }

  const handleDelete =async (id) => {
    console.log(id);
    const res = await removeBlogByID(id);
    await getBlogsData();
    // const blogAfterDel = blogList.filter(
    //   (blog) => blog.id !== id
    //   );
    //   console.log("blogAfterDel",blogAfterDel);
    //   setBlogList(blogAfterDel);
    //   localStorage.setItem('blogs', JSON.stringify(blogAfterDel));
  };

  

  return (
    <>
      <Navbar token={true} />
      <Container size="xl" className={classes.content}>
        <Group justify="space-between" py={20}>
          <Text sm="xl" fw={600} style={{ fontSize: 24 }}>
            Your Blog Posts
          </Text>
          <Link to="/admin/create">
            <Button
              variant="outline"
              leftSection={
                <IconPlus style={{ width: rem(16), height: rem(16) }} />
              }
            >
              Create Blog
            </Button>
          </Link>
        </Group>
        {blogList.length === 0 ? (
          <Group justify="center" style={{height:"60vh"}}>
            <Text size="lg">No Blog Posts</Text></Group>
        ) : (
          blogList.map((item, index) => {
            return(
              <div key={index} >
              <BlogCard
                item={item}
                handleDelete={handleDelete}
                blogList={blogList}
                setBlogList = {setBlogList}
                isAdmin={true}
              />
            </div>
            )
          })
        )}
      </Container>
      <Space h={30} />
      <Footer/>
    </>
  );
};

export default AdminPage;
