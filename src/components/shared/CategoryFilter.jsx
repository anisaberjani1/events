import { Label, Select } from "flowbite-react";
import React from "react";

const CategoryFilter = () => {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="countries">Select your country</Label>
      </div>
      <Select id="countries" required>
        <option>United States</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
    </div>
  );
};

export default CategoryFilter;
