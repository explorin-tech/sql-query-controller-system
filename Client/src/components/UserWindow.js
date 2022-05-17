import React, { Fragment, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import AddModal from '../common/AddModal';
import DbRights from './DatabaseRights';
import ScreenRights from './ScreenRights';

import '../static/css/tabs.css';

export default function AddUser() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <div>
            <span className="searchTable">
              <span className="headData"> User </span>{' '}
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
                <tbody>
                  <tr>
                    <td>
                      <span>First Name</span>
                      <input type="text" />
                    </td>
                    <td>
                      <span>Last Name</span>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Email</span>
                      <input type="email" />
                    </td>
                    <td>
                      <span>Password</span>
                      <input type="password" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>User Role</span>
                      <select>
                        <option>A</option>
                        <option>B</option>
                      </select>
                    </td>
                    <td>
                      <span>Is Active Direct User</span>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </AddModal>
          <div>
            <button className="blueButton" onClick={() => setModalShow(true)}>
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
    </Fragment>
  );
}
