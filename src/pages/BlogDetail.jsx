import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {
    Avatar,
    Container,
    Group,
    Text,
    Grid,
    Space,
    Image,
} from "@mantine/core";
import {IconChevronLeft} from "@tabler/icons-react";
import classes from "../assets/css/style.module.css";
import nature from "../assets/images/nature.jpg";
import Footer from "../components/Footer";
import {getBlogByID,} from "../api/blog.ts";
import {useParams} from "react-router-dom";

const BlogDetail = () => {
    const [blog, setBlog] = useState({})
    const {id} = useParams();

    useEffect(() => {
        getBlogDetails().then();
    }, []);
    const getBlogDetails = async () => {
        const res = await getBlogByID(id);
        if (res?.data?.status=== 1) {
          setBlog(res.data?.data);
        }
    }


  const handleGoBack = () =>{
    window.history.back();
  }

    return (
        <div>
            <Navbar token={true}/>
            <Container size="xl" py={20}>
                <Grid>
                    <Grid.Col span={{base: 12, md: 2, lg: 2}}>
                        <Group>
                            <Avatar color="black" variant="default" onClick={handleGoBack} style={{cursor: "pointer"}}>
                                <IconChevronLeft/>
                            </Avatar>
                            <Text size="md"> Back to Blog</Text>
                        </Group>
                    </Grid.Col>

                </Grid>
                <Space h="lg"/>
                <Group align="center" justify="center">
                    <div className={classes.description}>
                        <Text size="sm" c="dimmed">
                            Created on {blog.created_at}
                        </Text>
                        <Space h={8}/>
                        <Text fw={500} className={classes.title}>
                          {blog.title}
                        </Text>
                        <Space h={15}/>
                        <Image src={nature} h={500}/>

                        <Space h="lg"/>
                      <Text size="md" ta="justify">
                        <div dangerouslySetInnerHTML={{__html: blog.description}}></div>
                      </Text>
                    </div>
                </Group>
              <Space h={30}/>
            </Container>
            <Footer/>
        </div>
    );
};

export default BlogDetail;
