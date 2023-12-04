import {
  NFTCreated as NFTCreatedEvent,
  PartURIUpdated as PartURIUpdatedEvent,
  WinnerRewarded as WinnerRewardedEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import { NFTCreated, PartURIUpdated, WinnerRewarded } from "../generated/schema"

export function handleNFTCreated(event: NFTCreatedEvent): void {
  let entity = new NFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.partIds = event.params.partIds
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePartURIUpdated(event: PartURIUpdatedEvent): void {
  let entity = new PartURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.partId = event.params.partId
  entity.newURI = event.params.newURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWinnerRewarded(event: WinnerRewardedEvent): void {
  let entity = new WinnerRewarded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.winner = event.params.winner
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
