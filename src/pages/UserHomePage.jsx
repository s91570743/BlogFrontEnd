import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container, Group, Text, Button, Space,rem } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import classes from '../assets/css/style.module.css'
import BlogCard from '../components/card/BlogCard'
import {getBlogs} from "../api/blog.ts";

const UserHomePage = () => {
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

  return (
    <div>
      <Navbar token={false} />  
      <Container size="xl" className={classes.content}>
        <Group justify="space-between" py={20}>
          <Text sm="lg" fw={600} style={{ fontSize: 24 }}>
             For you 🗒️🗒️
          </Text>
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
                blogList={blogList}
                setBlogList = {setBlogList}
                isAdmin={false}
              />
            </div>
            )
          })
        )}
      </Container>
      <Space h={30} />
      <Footer/>
    </div>
  )
}

export default UserHomePage