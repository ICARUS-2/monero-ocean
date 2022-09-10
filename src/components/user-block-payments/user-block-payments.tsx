import { useEffect, useState } from 'react'
import DependencyContainer from '../../lib/dependencies';
import UserBlockPaymentRecord from '../../models/user-block-payments/user-block-payment-record';
import './user-block-payments.css'
import { useNavigate } from 'react-router-dom';
import SignInHelper from '../../lib/sign-in-helper';
import SiteRoutes from './../../lib/site-routes';
import LocalStorageHelper from '../../lib/local-storage-helper';
import { getDataByPort } from '../../lib/coins';
import DateTimeFormatter from '../../lib/datetime-formatter';

const UserBlockPayments = () => {

  const MAX_ENTRIES = 100;
  const [pageNumber, setPageNumber] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [formErrorMsg, setFormErrorMessage] = useState("");
  const [payments, setPayments] = useState<UserBlockPaymentRecord[]>([]);
  const [errorCallingApi, setErrorCallingApi] = useState<boolean>(false);
  let navigate = useNavigate();

  const handlePageChange = (increment: number) => 
  {
    setPageNumber( (c) => c+increment)
  }

  const handleEntriesPerPageSubmit = (event: any) =>
  {
    let val = event.target.entriesPerPage.value;
    
    if (val > MAX_ENTRIES || val < 1)
    {
      setFormErrorMessage("Must be between 1 and " +MAX_ENTRIES);
    }
    else
    {
      setFormErrorMessage("");
      setEntriesPerPage(val);
    }

    event.preventDefault();
  }

  useEffect( () =>
  {
    if (!SignInHelper.isSignedIn().isSignedIn)
    {
      navigate(SiteRoutes.getErrorRoute());
    }
    //Fires once page is changed
    fetchPayments();
    //Fetch blocks for new page here
  }, [pageNumber, entriesPerPage])

  const fetchPayments = async () => 
  {
    let userAddress = LocalStorageHelper.getMoneroAddress();

    if (userAddress != null)
    {
      let result = await DependencyContainer.moneroOceanClient.getUserBlockPayments(userAddress, pageNumber, entriesPerPage);

      if (result)
      {
        setPayments(result);
        setErrorCallingApi(false);
      }
      else
      {
        setErrorCallingApi(true);
      }
    }
  }

  return (
    <div className='userBlockPaymentsContainer'>
      <div className='m-4'></div>
      {errorCallingApi &&
        <div className='alert alert-danger'>Error retrieving data</div>
      }
      <h2>Your Block Payments</h2>
      <div className='m-4'></div>

      <div className='userBlockPaymentsPageInfo'>
        <h4>Page {pageNumber} ({entriesPerPage} entries/page)</h4>
        <div className='ubpSpacingDiv'></div>
        
        <form onSubmit={handleEntriesPerPageSubmit}>
          <h6>Set entries/page (max 100)</h6>
          <div className='d-flex'>
            <input type="number" name="entriesPerPage" className='boxComponent ubpEntriesPerPageInput' defaultValue={entriesPerPage}></input>

            <button className='boxButton' type='submit'>Apply</button>
          </div>
          <div className='redText'>{formErrorMsg}</div>
        </form>
      </div>

      <div className='ubpPageButtons mt-3'>
        <div className='w-100 ubpPrevPage'>
          {pageNumber > 1 &&
            <button className='boxButton' onClick={ () => {handlePageChange(-1)}}>{"<- Previous Page"}</button>
          }
        </div>

        <div className='w-100 ubpNextPage'>
          <button className='boxButton' onClick={ () => {handlePageChange(1)}}>{"Next Page ->"}</button>
        </div>
      </div>
      
      <div className='userBlockPaymentsInner boxComponent'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <td className='statText'>Coin</td>
                <td className='statText'>Index</td>
                <td className='statText'>Found</td>
                <td className='statText'>Paid</td>
                <td className='statText'>XMR Reward</td>
                <td className='statText'>Reward %</td>
                <td className='statText'>Hash</td>
              </tr>
            </thead>
            <tbody>
              {
                payments.map( (payment: UserBlockPaymentRecord, index: number) =>
                {
                  return (
                    <tr key={index}>
                      <td className='lightGreenText'>{getDataByPort(payment.port).name}</td>
                      <td className='lightGreenText'>{payment.index}</td>
                      <td className='lightGreenText'>{DateTimeFormatter.UnixTSToDateLong(payment.found)}</td>
                      <td className='lightGreenText'>{DateTimeFormatter.UnixTSToDateLong(payment.paid)}</td>
                      <td className='lightGreenText'>{payment.xmrValue.toFixed(12)}</td>
                      <td className='lightGreenText'>{payment.blockRewardPercentage}</td>
                      <td className='lightGreenText'>{payment.hash}</td>
                    </tr>
                  )
                } )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserBlockPayments