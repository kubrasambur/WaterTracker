import React from "react";
import { Modal, Button, FormControl, Input } from "native-base";

export default function CustomEditModal({
  isOpen,
  setOpen,
  value,
  onChangeText,
  handleOnPress,
  title,
}) {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} safeAreaTop={true}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{title}</FormControl.Label>
            <Input value={value} onChangeText={onChangeText} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={setOpen}>
              Edit
            </Button>
            <Button onPress={handleOnPress}>Add</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
