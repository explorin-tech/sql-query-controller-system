import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import AddModal from "../common/addModal";
import ScreenRights from "./screenRights";
import DbRights from "./databaseRights";

import "../static/css/tabs.css";

export default function AddUser() {

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="application">
        <div className="appTab">
          <div>
            <span className="searchTable">
              <span className="headData"> User </span>{" "}
              <select>
                <option>-- Select --</option>
                <option>A</option>
                <option>B</option>
              </select>
            </span>
          </div>
          <AddModal
            modalShow={modalShow}
            setModalShow={setModalShow}
            title="Add User"
          >
            <form>
              <table>
                <tr>
                  <td>
                    <span>First Name</span><br />
                    <input type="text" />
                  </td>
                  <td>
                    <span>Last Name</span><br />
                    <input type="text" />

                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Email</span><br />
                    <input type="email" />
                  </td>
                  <td>
                    <span>Password</span><br />
                    <input type="password" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>User Role</span><br />
                    <select>
                      <option>A</option>
                      <option>B</option>
                    </select>
                  </td>
                  <td>
                    <span>Is Active Direct User</span><br />
                    <input type="text" />
                  </td>
                </tr>
              </table>
            </form>
          </AddModal>
          <div>
            <button
              className="blueButton"
              onClick={() => setModalShow(true)}
            >
              <i className="fas fa-plus"></i> Add User
            </button>
          </div>
        </div>
        <Tabs>
          <TabList className="groupTabs">
            <Tab>Screen Rights</Tab>
            <Tab>Database Rights</Tab>
          </TabList>
          <div className="tabPanel">
            <TabPanel>
              <ScreenRights />
            </TabPanel>
            <TabPanel>
              <DbRights />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </>
  );
}
