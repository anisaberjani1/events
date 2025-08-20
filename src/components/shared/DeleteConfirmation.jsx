import { useState } from "react";
import { Modal, Button, ModalHeader, ModalBody } from "flowbite-react";
import deleteIcon from "../../assets/icons/delete.svg";

const DeleteConfirmation = ({ eventId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // const handleDelete = async () => {
  //   setIsPending(true);
  //   try {
  //     const res = await fetch(`/api/events/${eventId}`, {
  //       method: "DELETE",
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to delete event");
  //     }

  //     ✅ close modal and optionally refresh list
  //     setOpenModal(false);
  //     If you want to reload the page/list:
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Delete failed:", err);
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  return (
    <>
      <Button color="failure" onClick={() => setOpenModal(true)}>
        <img src={deleteIcon} alt="delete" width={20} height={20} />
      </Button>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-amber-50" />
        <ModalBody>
          <div className="text-center flex flex-col gap-6 bg-amber-50 !p-10">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                className="!px-2"
                // onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Yes, delete"}
              </Button>
              <Button
                color="blue"
                className="!px-2"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
