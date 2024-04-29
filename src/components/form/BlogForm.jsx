import React, {useEffect} from "react";
import {
  Group,
  Text,
  rem,
  Space,
  TextInput,
  Fieldset,
  SimpleGrid,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";

import { useEditor } from "@tiptap/react";
import RichTextEditorField from "../editor/RichTextEditorField";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Link } from "@mantine/tiptap";
import {localIMGURL} from "../../util/constant.ts";

const BlogForm = ({ files, setFiles, formik ,...props}) => {

  const descriptionData = formik.values.description;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: formik.values.description, // Pass the content to the editor
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      formik.setFieldValue("description", newContent); // Update the state with the current content whenever it changes
    },
  });
    useEffect(() => {
     let check = editor;
     if (props?.editDescription === formik.values.description) {
         editor?.chain().setContent(formik.values.description).run()
     }


    }, [formik.values]);

  const previews = formik?.values?.img && !files?.length  ? <img
      src={localIMGURL+formik.values.img}
      style={{width: "100px", height: "auto", marginRight: "10px"}}
      onLoad={() => URL.revokeObjectURL(localIMGURL+formik.value.img)}
  />
      : files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return (
          <img
              key={index}
              src={imageUrl}
              style={{width: "100px", height: "auto", marginRight: "10px"}}
              onLoad={() => URL.revokeObjectURL(imageUrl)}
              alt={`Image ${index}`}
          />
      );
  });
    return (
        <div>
            <Text size="sm" fw={500}>
                Image
            </Text>
            <Space h="sm"/>
            <Dropzone
                onDrop={(files) => setFiles(files)}
                onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        // {...props}
      >
        <Group
          justify="center"
          gap="xl"
          mih={100}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="md" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Image should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Space h="md" />
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
      <Space h="md" />
      <Fieldset py={18}>
        <TextInput
          label="Title"
          placeholder="Enter your title"
          labelProps={{
            style: { marginBottom: "5px", fontSize: "14px" },
          }}
          // required
          size="md"
          radius="md"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Space h="sm" />
        {formik.errors.title && formik.touched.title && (
          <Text size="xs" style={{ color: "#fa5252" }}>
            {formik.errors.title}
          </Text>
        )}
        <Space h="md" />
        <Text size="sm" fw={500}>
          Description
        </Text>
        <Space h="sm" />
        <div>
          <input
            type="hidden"
            name="description" 
            value="" 
          />
          <RichTextEditorField editor={editor} blur={formik.handleBlur} name="description" />
        </div>
        <Space h="sm" />
        {formik.errors.description && formik.touched.description && (
          <Text size="xs" style={{ color: "#fa5252" }}>
            {formik.errors.description}
          </Text>
        )}
      </Fieldset>
    </div>
  );
};

export default BlogForm;
