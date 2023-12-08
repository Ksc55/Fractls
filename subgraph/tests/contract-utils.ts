import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NFTCreated,
  PartURIUpdated,
  WinnerRewarded
} from "../generated/Contract/Contract"

export function createNFTCreatedEvent(
  tokenId: BigInt,
  partIds: Array<BigInt>,
  owner: Address
): NFTCreated {
  let nftCreatedEvent = changetype<NFTCreated>(newMockEvent())

  nftCreatedEvent.parameters = new Array()

  nftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "partIds",
      ethereum.Value.fromUnsignedBigIntArray(partIds)
    )
  )
  nftCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return nftCreatedEvent
}

export function createPartURIUpdatedEvent(
  tokenId: BigInt,
  partId: BigInt,
  newURI: string
): PartURIUpdated {
  let partUriUpdatedEvent = changetype<PartURIUpdated>(newMockEvent())

  partUriUpdatedEvent.parameters = new Array()

  partUriUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  partUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("partId", ethereum.Value.fromUnsignedBigInt(partId))
  )
  partUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("newURI", ethereum.Value.fromString(newURI))
  )

  return partUriUpdatedEvent
}

export function createWinnerRewardedEvent(
  winner: Address,
  tokenId: BigInt
): WinnerRewarded {
  let winnerRewardedEvent = changetype<WinnerRewarded>(newMockEvent())

  winnerRewardedEvent.parameters = new Array()

  winnerRewardedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  winnerRewardedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return winnerRewardedEvent
}
