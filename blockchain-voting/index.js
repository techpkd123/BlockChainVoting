web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCandidateList","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xe04a7f7ccf9a363d7777a769b0f2c4e3b5143044');

parties = { "BJP": "party-1", "CONG": "party-2", "AAP": "party-3", "BSP": "party-4", "SP": "party-5", "OTHERS": "party-6" }

function voteForCandidate() {
  $('#loader').show();
  candidateName = $('input[name=party]:checked').val();
  contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
    let div_id = parties[candidateName];
    setTimeout(function () {
      $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
      $('#loader').hide();
    }, 500);

  });
}

$(document).ready(function () {
  $('#loader').show();
  setTimeout(() => {
    partiesNames = Object.keys(parties);
    for (var i = 0; i < partiesNames.length; i++) {
      let name = partiesNames[i];
      let val = contractInstance.totalVotesFor.call(name).toString()
      $("#" + parties[name]).html(val);
    }
    $('#loader').hide();
  }, 500);

});
