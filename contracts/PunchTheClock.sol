pragma solidity ^0.4.16;

contract PunchTheClock {

    address public admin;
    string public name;
    uint public arrivalsCount;
    uint public departuresCount;
    uint public timeMin;
    uint public timeMax;

    function PunchTheClock(address _admin, string _name, uint _timeMin, uint _timeMax) public {
        admin = _admin;
        name = _name;
        arrivalsCount = 0;
        departuresCount = 0;
        timeMin = _timeMin;
        timeMax = _timeMax;
    }

    /**
     * Structs
     * @type entity
     * @type timestamp
    */
    struct entity {
        string name;
        bool isActive;
        bool isApproved;
        bool isRegistered;
        uint arrivals;
        uint departures;
        uint timeArrived;
        uint timeDeparted;
    }

    struct timestamp {
        address eid;
        uint time;
    }

    /**
     * Mapping
     * @type entityList: Status of everyone registering with Smart Contract
     * @type arrivalList: List of times people arrived
     * @type departList: List of times people departed
    */
    mapping (address => entity) public entityList;
    mapping (uint => timestamp) public arrivalList;
    mapping (uint => timestamp) public departList;

    address[] public registeredList;

    /**
     * Events
     * Monitor smart contact events to push state changes
    */
    event EventRegister(    
      address indexed _from,
      string _name
    );
    event EventArrive(    
      address indexed _from,
      string _name
    );
    event EventDepart(    
      address indexed _from,
      string _name
    );
    
    /**
     * Modifiers
    */
    modifier isAdmin() {
        require(admin == msg.sender);
        _;
    }

    modifier isApproved() {
        require(entityList[msg.sender].isApproved == true);
        _;
    }

    modifier isTimeMinimum() {
        require(now >= entityList[msg.sender].timeArrived + timeMin); 
        _;
    }

    modifier isTimeMaximum() {
        require(now <= entityList[msg.sender].timeArrived + timeMax); 
        _;
    }

    function isRegistered(address _address) public view returns(bool isIndeed) {
        return entityList[_address].isRegistered;
    }

    /**
     * Administrator Privileges
     */
    function adminApprove(address _address) public isAdmin {
        entityList[_address].isApproved = true;
    }
    function adminRevoke(address _address) public isAdmin {
        entityList[_address].isApproved = false;
    }
    function adminDeactivate(address _address) public isAdmin {
        entityList[_address].isActive = false;
    }
    function adminNameEntity(address _address, string _name) public isAdmin {
        entityList[_address].name = _name;
    }
    function adminTransferOwnership(address _address) public isAdmin {
        admin = _address;
    }

    /**
     * Entity Privileges
     */
    function name(string _name) public isApproved {
        entityList[msg.sender].name = _name;
    }
    
    function arrive() public isApproved {
        arrivalList[arrivalsCount].eid = msg.sender;
        arrivalList[arrivalsCount].time = now;
        entityList[msg.sender].isActive = true;
        entityList[msg.sender].arrivals++; 
        entityList[msg.sender].timeArrived = now;
        arrivalsCount++;
    }

    function depart() public isApproved isTimeMinimum isTimeMaximum {
        departList[departuresCount].eid = msg.sender;
        departList[departuresCount].time = now;
        entityList[msg.sender].isActive = false;
        entityList[msg.sender].departures++;
        entityList[msg.sender].timeDeparted = now;
        departuresCount++;
    }

    function register() public {
        require(!isRegistered(msg.sender));
        entityList[msg.sender].isRegistered = true;
        entityList[msg.sender].isApproved = false;
        entityList[msg.sender].arrivals = 0;
        entityList[msg.sender].departures = 0;
        registeredList.push(msg.sender);
    }

    /**
     * Views
     */
    function getRegisteredAddresses() view public returns (address[]) {
        return registeredList;
    }

    function getEntityData(address _address) view public returns (string, bool, bool, uint, uint, uint, uint) {
        return (entityList[_address].name, entityList[_address].isApproved, entityList[_address].isActive, entityList[_address].timeArrived, entityList[_address].timeDeparted, entityList[_address].arrivals, entityList[_address].departures);
    }

}
