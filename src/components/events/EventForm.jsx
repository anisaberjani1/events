import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventFormSchema } from "../../middleware/validator";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import {
  TextInput,
  Textarea,
  Select,
  FileInput,
  Checkbox,
  Button,
  HelperText,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { eventDefaultValues } from "../../../constants";
import { useCreateEvent, useUpdateEvent } from "../../hooks/useEvents";
import { useNavigate } from "react-router";

export default function EventForm({ type = "Create", event, eventId }) {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [files, setFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState(event?.imageUrl || "");
  const { mutateAsync: createEventMutation, isLoading: isCreating } =
    useCreateEvent();
  const { mutateAsync: updateEventMutation, isLoading: isUpdating } =
    useUpdateEvent();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(eventFormSchema),
    defaultValues: event || eventDefaultValues,
  });

  useEffect(() => {
    if (event && type === "Update") {
      reset(event);
      setImageUrl(event.imageUrl || "");
    }
  }, [event, reset, type]);

  const uploadImage = async (file) => {
    if (!file) return "";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_events");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/drjnie1fg/image/upload",
      formData
    );
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    let uploadedUrl = imageUrl;

    if (files) {
      uploadedUrl = await uploadImage(files);
      setImageUrl(uploadedUrl);
    }
    const eventPayload = {
      ...data,
      imageUrl: uploadedUrl,
      organizerId: user?.sub,
      organizerName: user?.name,
    };
    if (type === "Create") {
      await createEventMutation(eventPayload);
      navigate("/events");
    } else {
      await updateEventMutation({ id: eventId, ...eventPayload });
      navigate(`/events/${eventId}`);
    }
    reset();
    setFiles([]);
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <TextInput
            {...register("title")}
            placeholder="Event title"
            theme={{
              field: {
                input: {
                  base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-4 !py-3 !border-none !focus:ring-0",
                },
              },
            }}
          />
          {errors.title && (
            <HelperText color="failure">{errors.title.message}</HelperText>
          )}
        </div>
        <div className="w-full">
          <Select
            {...register("category")}
            value={watch("category")}
            theme={{
              field: {
                select: {
                  base: "!w-full !bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-5 !py-3 !border-none !focus:ring-0",
                },
              },
            }}
          >
            <option value="">Select category</option>
            <option value="tech">Tech</option>
            <option value="music">Music</option>
            <option value="business">Business</option>
          </Select>
          {errors.category && (
            <HelperText color="failure">{errors.category.message}</HelperText>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <Textarea
            {...register("description")}
            placeholder="Description"
            rows={6}
            theme={{
              base: "!bg-gray-50 !text-gray-500 !placeholder:text-gray-500 rounded-2xl !px-4 !py-3 !border-none !focus:ring-0",
            }}
          />
          {errors.description && (
            <HelperText color="failure">
              {errors.description.message}
            </HelperText>
          )}
        </div>
        <div className="w-full">
          <FileInput
            id="imageFile"
            {...register("imageFile")}
            onChange={(e) => setFiles(e.target.files?.[0])}
            theme={{
              base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 rounded-full !px-4 !py-3 !border-none !focus:ring-0",
            }}
          />
          {errors.imageUrl && (
            <HelperText color="failure">{errors.imageUrl.message}</HelperText>
          )}
        </div>
      </div>

      <div className="w-full">
        <TextInput
          {...register("location")}
          placeholder="Event location or Online"
          theme={{
            field: {
              input: {
                base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-4 !py-3 !border-none !focus:ring-0",
              },
            },
          }}
        />
        {errors.location && (
          <HelperText color="failure">{errors.location.message}</HelperText>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <p className="text-[14px] !p-1">Start Date: </p>
          <TextInput
            type="datetime-local"
            {...register("startDateTime")}
            value={
              watch("startDateTime")
                ? new Date(watch("startDateTime")).toISOString().slice(0, 16)
                : ""
            }
            theme={{
              field: {
                input: {
                  base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-4 !py-3 !border-none !focus:ring-0",
                },
              },
            }}
          />
          {errors.startDateTime && (
            <HelperText color="failure">
              {errors.startDateTime.message}
            </HelperText>
          )}
        </div>
        <div className="w-full">
          <p className="text-[14px] !p-1">End Date: </p>
          <TextInput
            type="datetime-local"
            {...register("endDateTime")}
            value={
              watch("endDateTime")
                ? new Date(watch("endDateTime")).toISOString().slice(0, 16)
                : ""
            }
            theme={{
              field: {
                input: {
                  base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-4 !py-3 !border-none !focus:ring-0",
                },
              },
            }}
          />
          {errors.endDateTime && (
            <HelperText color="failure">
              {errors.endDateTime.message}
            </HelperText>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full flex items-center gap-3">
          <TextInput
            {...register("price")}
            placeholder="Price"
            disabled={watch("isFree")}
            theme={{
              field: {
                input: {
                  base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-4 !py-3 !border-none !focus:ring-0",
                },
              },
            }}
          />
          <Checkbox {...register("isFree")} id="isFree" />
          <label htmlFor="isFree">Free Ticket</label>
          {errors.price && (
            <HelperText color="failure">{errors.price.message}</HelperText>
          )}
        </div>

        <div className="w-full">
          <TextInput
            {...register("url")}
            placeholder="Event URL"
            theme={{
              field: {
                input: {
                  base: "!bg-gray-50 !h-[54px] !text-gray-500 !placeholder:text-gray-500 !rounded-full !px-4 !py-3 !border-none !focus:ring-0",
                },
              },
            }}
          />
          {errors.url && (
            <HelperText color="failure">{errors.url.message}</HelperText>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isCreating || isUpdating}
        className="button col-span-2 w-full"
      >
        {isSubmitting ? "Submitting..." : `${type} Event`}
      </Button>
    </form>
  );
}
