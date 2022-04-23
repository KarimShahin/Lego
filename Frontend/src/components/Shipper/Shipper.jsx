import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function Shipper() {
  return (
    <div>
      <div class="table-responsive">
        <table
          class="table"
          style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">user</th>
              <th scope="col">order date</th>
              <th scope="col">product</th>
              <th scope="col">tax</th>
              <th scope="col">withShipped</th>
              <th scope="col">shipper</th>
              <th scope="col">statues</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Alaa</td>
              <td>
                12/2/2020
              </td>
              <td>
                <ul>
                  <li>product 1</li>
                  <li>product 3</li>
                  <li>product 2</li>
                  <li>product 1</li>
                </ul>
              </td>
              <td>23 Eg</td>
              <td>true</td>
              <td>Ahmed</td>
              <td>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
              </td>
              <td>
                <select class="form-select" aria-label="Default select example">
                  <option selected>choose Order statues</option>
                  <option value="1">Is Shipped</option>
                  <option value="2">Is Delivered</option>
                  <option value="3">Is Pending</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
